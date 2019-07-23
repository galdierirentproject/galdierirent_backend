'use strict'
var User = require('../models/user_model');
var jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server-express');
const bcrypt = require('bcrypt');

/**
 * Search the user in the db
 * Use mongooose
 * @param {User} args User requesting access, is important for check username and password
 * @return {User} Returned user wanted
 */
async function authenticate(args) {
    return new Promise(async(resolve, reject) => {
        const user = args.user;
        var query = { username: user.username };
        User.find(query, (error, user) => {
            const errors = [];
            if (error) {
                reject('Mongo error');
            } else {
                if (!user) {
                    reject('Utente non esistente');
                } else {
                    resolve(user[0]);
                }
            }
        });
    })
};
/**
 * Generate token
 * @param {User} args User requesting access
 * @return {JSON} token
 */
async function generate_token(args) {
    return new Promise(async(resolve, reject) => {
        const user = args;
        const token = jwt.sign({ id: user._id, email: user.email, ruolo: user.ruolo }, process.env.JWT_SECRET, { expiresIn: '1h' });
        resolve(token);
    })
};
/**
 * Comparison of encrypted passwords.
 * Use bcrypt
 * @param {User} args User requesting access, is important for check username and password
 * @return {User} In user add a genereted token
 */
async function login(args) {
    return new Promise(async(resolve, reject) => {
        this.authenticate(args).then(async(utente) => {
            if (!utente) {
                reject('Username non corretta');
            }
            let input_password = await bcrypt.hash(args.user.password, 10);
            const match = await bcrypt.compare(utente.password, input_password);
            if (match) {
                //se l'uguaglianza è verificata genero il token
                let token = await this.generate_token(utente);
                utente.token = token;
                if (utente.state === 'abilitato') {
                    resolve(utente);
                } else {
                    reject('Utente disabilitato');
                }
            } else {
                reject('Password non corretta');
            }
        }).catch((errors) => {
            reject(errors);
        });

    })
};


module.exports = {
    authenticate,
    generate_token,
    login
}