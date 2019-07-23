var user_controller = require('../../controllers/user_controller');
var authenticate_controller = require('../../controllers/authenticate_controller');
const { UserInputError } = require('apollo-server-express');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

import {
    GraphQLDateTime
} from 'graphql-iso-date';

const resolver_user = {
    Date: GraphQLDateTime,
    Query: {
        authenticate_graphql: async(parent, args, context) => {
            const result = await authenticate_controller.login(args);
            return result;
        },
        autocompletamento_cliente: async(parent, args, context) => {
            const result = await user_controller.autocompletamento_cliente(args);
            return result;
        },
        autocompletamento_areamanager: async(parent, args, context) => {
            const result = await user_controller.autocompletamento_areamanager(args);
            return result;
        },

        ricerca_utente_id: async(parent, args, context) => {
            var token = context.result.slice(7);
            const result = await user_controller.ricerca_utente_id(args);
            return result;
            return jwt.verify(token, process.env.JWT_SECRET, async(err, decode) => {
                if (err) {
                    const error = new UserInputError('token expired!!!', {
                        invalidArgs: token,
                        myError: "token expired or invalid"
                    });
                    error.code = 401;
                    return error;
                } else {
                    if ((jwt.decode(token).ruolo === 'superadmin')) {
                        const result = await user_controller.ricerca_utente_id(args);
                        return result;
                    } else {
                        const error = new UserInputError('auth!!!', {
                            invalidArgs: token,
                            myError: "ruolo non autorizzato"
                        });
                        error.code = 401;
                        return error;
                    }
                }
            });

        },

        ricerca_point: async(parent, args, context) => {
            var token = context.result.slice(7);
            console.log();
            const result = await user_controller.ricerca_point();
            return result;
            return jwt.verify(token, process.env.JWT_SECRET, async(err, decode) => {
                if (err) {
                    const error = new UserInputError('token expired!!!', {
                        invalidArgs: token,
                        myError: "token expired or invalid"
                    });
                    error.code = 401;
                    return error;
                } else {
                    if ((jwt.decode(token).ruolo === 'superadmin')) {
                        const result = await user_controller.ricerca_utente_id(args);
                        return result;
                    } else {
                        const error = new UserInputError('auth!!!', {
                            invalidArgs: token,
                            myError: "ruolo non autorizzato"
                        });
                        error.code = 401;
                        return error;
                    }
                }
            });

        }


    },
    Mutation: {
        crea_utente: async(parent, args, context) => {
            var token = context.result.slice(7);

            const result = await user_controller.crea_utente(args);
            const result_folder = await user_controller.creazione_cartella_utente(args.user.email);
            if (result_folder) {
                return result;
            } else {
                const error = new UserInputError('Cartella non creata!!!', {
                    invalidArgs: context,
                    myError: "token_error_test"
                });
                error.code = 401;
                return error;
            }
            return jwt.verify(context.result, process.env.JWT_SECRET, async(err, decode) => {
                if (err) {
                    const error = new UserInputError('token expired!!!', {
                        invalidArgs: context,
                        myError: "token expired or invalid"
                    });
                    error.code = 401;
                    return error;
                } else {

                }
            });


        },

        paginatore_clienti: async(parent, args, context) => {
            const result = await user_controller.paginatore_clienti(args);
            const num = await user_controller.numero_clienti_paginatore(args.utente, args.filterValue, args.selection_key);
            return { utenti: result, n_utenti: num };
        },
        paginatore_utenti: async(parent, args, context) => {
            const result = await user_controller.paginatore_utenti(args);
            const num = await user_controller.numero_utenti_paginatore(args.filterValue, args.selection_key);
            return { utenti: result, n_utenti: num };
        },

        generateshaForallDB: async(parent, args, context) => {
            const _output = await user_controller.generatesha();
            await _output.forEach(element => {
                bcrypt.hash(element.password, 10).then(function(hash) {
                    console.log(hash);
                    element.sha512 = hash;
                    user_controller.crea_utente({ user: element });
                });

            });
            return _output;

            const result = jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
                if (err) {
                    const error = new UserInputError('token expired!!!', {
                        invalidArgs: context,
                        myError: "token expired or invalid"
                    });
                    error.code = 401;
                    return error;
                } else {
                    //const user = await user_controller.elimina_utente(args);
                    return true;
                }
            });
            if (result === true) {

            } else
                return result
        },


        elimina_utente: async(parent, args, context) => {
            const _output = await user_controller.elimina_utente(args);
            return _output;

            const result = jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
                if (err) {
                    const error = new UserInputError('token expired!!!', {
                        invalidArgs: context,
                        myError: "token expired or invalid"
                    });
                    error.code = 401;
                    return error;
                } else {
                    //const user = await user_controller.elimina_utente(args);
                    return true;
                }
            });
            if (result === true) {

            } else
                return result
        },



        modifica_utente: async(parent, args) => {
            var token = context.result.slice(7);

            return jwt.verify(token, process.env.JWT_SECRET, async(err, decode) => {
                if (err) {
                    const error = new UserInputError('token expired!!!', {
                        invalidArgs: context,
                        myError: "token expired or invalid"
                    });
                    error.code = 401;
                    return error;
                } else {
                    if ((jwt.decode(token).ruolo === 'superadmin')) {
                        const result = await user_controller.update_graphql(args);
                        return result;
                    } else {
                        const error = new UserInputError('auth!!!', {
                            invalidArgs: context,
                            myError: "ruolo non autorizzato"
                        });
                        error.code = 401;
                        return error;
                    }
                }
            });

        }
    }
};
module.exports = { resolver_user };