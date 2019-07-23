var User = require('../models/user_model');
var mkdirp = require('mkdirp');
const { UserInputError, ApolloError } = require('apollo-server-express');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
var path_user_folder = '/var/www/vhosts/galdierirents.info/graphql2.galdierirents.info/users/';
var mongoose = require('mongoose');

var path = require('path');

/***********************************NUOVI METODI*****************************************/

async function paginatore_clienti(args) {
    return new Promise(async(resolve, reject) => {
        let user = args.utente;
        var skip = parseInt(args.skip);
        var limit = parseInt(args.limit);
        var filterValue = args.filterValue;
        var selection_key = args.selection_key;
        let query = {};
        if (filterValue && selection_key) {
            var sub_query = {};
            var sub_query_1 = {};
            sub_query_1[selection_key] = new RegExp(filterValue, 'i');
            query = { $and: [sub_query, sub_query_1] };
        }
        query['consulente.username'] = new RegExp(user.username, 'i');
        let _query = query;
        let query_ruolo = { ruolo: 'cliente' };
        query = { $and: [_query, query_ruolo] };
        User.find(query).sort({ _id: -1 }).skip(skip * limit).limit(limit).exec((err, users) => {
            if (err) {
                reject('Mongo error');
            } else {
                if (!users) {
                    reject('Lista vuota');
                } else
                    resolve(users);
            }
        });
    });
}

async function numero_clienti_paginatore(user, filterValue, selection_key) {
    return new Promise(async(resolve, reject) => {
        let query = {};
        if (filterValue && selection_key) {
            var sub_query = {};
            var sub_query_1 = {};
            sub_query_1[selection_key] = new RegExp(filterValue, 'i');
            query = { $and: [sub_query, sub_query_1] };
        }
        query['consulente.username'] = new RegExp(user.username, 'i');
        let _query = query;
        let query_ruolo = { ruolo: 'cliente' };
        query = { $and: [_query, query_ruolo] };
        User.find(query).count().exec((err, users) => {
            if (err) {
                reject('Mongo error');
            } else {
                if (!users) {
                    reject('Lista vuota');
                } else
                    resolve(users);
            }
        });
    });
}
async function paginatore_utenti(args) {
    return new Promise(async(resolve, reject) => {
        let user = args.point;
        var skip = parseInt(args.skip);
        var limit = parseInt(args.limit);
        var filterValue = args.filterValue;
        var selection_key = args.selection_key;
        let query = {};
        if (filterValue && selection_key) {
            query[selection_key] = new RegExp(filterValue, 'i');
        }
        let _query = query;
        let query_ruolo = { 'ruolo': { $ne: 'cliente' } };
        query = { $and: [_query, query_ruolo] };
        User.find(query).sort({ _id: -1 }).skip(skip * limit).limit(limit).exec((err, users) => {
            if (err) {
                reject('Mongo error');
            } else {
                if (!users) {
                    reject('Lista vuota');
                } else
                    resolve(users);
            }
        });
    });
}
async function numero_utenti_paginatore(filterValue, selection_key) {
    return new Promise(async(resolve, reject) => {
        let query = {};
        if (filterValue && selection_key) {
            query[selection_key] = new RegExp(filterValue, 'i');
        }
        let _query = query;
        let query_ruolo = { 'ruolo': { $ne: 'cliente' } };
        query = { $and: [_query, query_ruolo] };
        User.find(query).count().exec((err, users) => {
            if (err) {
                reject('Mongo error');
            } else {
                if (!users) {
                    reject('Lista vuota');
                } else
                    resolve(users);
            }
        });
    });
}


async function numero_utenti_filtrati(args) {
    return new Promise(async(resolve, reject) => {
        var filterValue = args.filterValue;
        var selection_key = args.selection_key;
        if ((filterValue != "") && (selection_key != "")) {
            var query = {};
            query[selection_key] = new RegExp(filterValue, 'i');

            if (args.type === "superadmin") {

            } else {
                if (args.consulente) {
                    var sub_query = { $and: [query, { consulente: { _id: args.consulente._id, username: args.consulente.username } }] };
                    query = sub_query;
                }
            }
            User.find(query).count().exec(function(err, users) {
                if (err) {
                    reject('Mongo error');
                } else {
                    if (!users) {
                        reject('Lista vuota');
                    } else {
                        resolve(users);
                    }
                }
            });
        }
    });
}

async function creazione_cartella_utente(user) {
    return new Promise(async(resolve, reject) => {
        mkdirp(path_user_folder + user, (err_mkdi) => {
            resolve(true);
        });
    });
}

async function crea_utente(args) {
    return new Promise(async(resolve, reject) => {
        const user = args.user;
        if (user._id == null) {
            let u = new User();
            user._id = u._id;
            if (user.ruolo !== 'cliente') {
                await bcrypt.hash(user.password, 10).then(function(hash) {
                    user.sha512 = hash;
                });
            }
        }
        var query = { _id: user._id };
        user.data = new Date().toLocaleString("en-US", { timeZone: "Europe/Rome" });
        User.findOneAndUpdate(query, { $set: user }, { upsert: true, new: true }, (err, user) => {
            const errors = [];
            if (err) {
                reject('Mongo error');
            } else {
                if (!user) {
                    reject('Utente non creato');
                } else {
                    const token = jsonwebtoken.sign({ id: user._id, email: user.email },
                        process.env.JWT_SECRET, { expiresIn: '1h' }
                    );
                    user.token = token;
                    resolve({ message: `Utente creato: ${user}` });
                }
            }

        });


    })
};


async function generatesha() {
    return new Promise(async(resolve, reject) => {
        await User.find({}).exec((err, users) => {
            if (err) {
                reject('Mongo error');
            } else {
                if (!users) {
                    reject('utenti non trovati');
                } else {
                    resolve(users);
                }

            }
        });
    });
}


function elimina_utente(args) {
    return new Promise(async(resolve, reject) => {
        var userID = args.id;
        User.findOneAndDelete({ '_id': userID }, (err, user) => {
            if (err) {
                reject('Mongo error');
            }
            if (user) {
                resolve({ message: 'utente cancellato', result: true });
            } else {
                reject('Utente non cancellato');
            }
        });
    });
};


function ricerca_utente_id(args) {
    return new Promise(async(resolve, reject) => {
        User.findOne({ _id: args.id }, (err, user) => {
            if (err) {
                reject('Mongo error');
            } else {
                if (!user) {
                    reject('Utente non trovato');
                } else {
                    resolve(user);
                }
            }
        });
    });
};

function scarica_immagine_profilo(req, res) {
    User.aggregate([
            { $match: { _id: mongoose.Types.ObjectId(req.query.id) } },
            { $project: { username: 1, profile_img: 1 } }
        ])
        .exec(function(err, user) {
            if (err) {
                res.status(500).send({ message: "Moongo error" });
            } else {
                if (!user) {
                    res.status(404).send({ message: "no data" });
                } else {
                    var a = 'users/' + user[0].username + '/' + user[0].profile_img;
                    console.log(a);
                    res.sendFile(path.resolve('./users/' + user[0].username + "/" + user[0].profile_img ));
                    // res.end();
                }
            }
        });
}
async function ricerca_point() {
    return new Promise(async(resolve, reject) => {
        User.aggregate([
            { $match: { 'nome_point': { $ne: null } } },
            { $group: { _id: '$nome_point' } }
        ]).exec((err, users) => {
            if (err) {
                reject('Mongo error');
            } else {
                if (!users) {
                    reject('Utente non trovato');
                } else
                    resolve(users);
            }
        });
    });
};
async function autocompletamento_cliente(args) {
    return new Promise(async(resolve, reject) => {
        let query = {};
        let query_nplus = {};
        let query_n = {};
        let query_0 = {};
        let query_1 = {};
        let query_2 = {};
        let query_3 = {};
        //permette la ricerca dei clienti in base al consulente 
        //il consulente puo essere ricercato per username 

        query_0['consulente.username'] = args.username;
        query_1['nome'] = new RegExp(args.filtro, 'i');
        query_2['cognome'] = new RegExp(args.filtro, 'i');
        query_3['cf'] = new RegExp(args.filtro, 'i');
        query = { $or: [query_1, query_2, query_3] };
        query_n = { $and: [{ 'consulente.username': args.username }, { $or: [query_1, query_2, query_3] }] };
        if (args.ruolo === "superadmin") {
            query_n = query;
        }
        query_nplus = query_n;
        query_nplus = { $and: [{ 'ruolo': 'cliente' }, query_n] };
        User.find(query_nplus).exec((err, users) => {
            if (err) {
                reject('Mongo error');
            } else {
                if (!users) {
                    reject('not found in DB');
                } else
                    resolve(users);
            }
        });
    });
};



async function autocompletamento_areamanager(args) {
    return new Promise(async(resolve, reject) => {
        let query_n = {};
        let query_0 = {};
        let query_1 = {};
        let query_2 = {};
        let query_3 = {};

        query_0 = { ruolo: 'areamanager' };
        query_1['nome'] = new RegExp(args.filtro, 'i');
        query_2['cognome'] = new RegExp(args.filtro, 'i');
        query_3['cf'] = new RegExp(args.filtro, 'i');
        query_n = { $and: [query_0, { $or: [query_1, query_2, query_3] }] };
        User.find(query_n).exec((err, users) => {
            if (err) {
                reject('Mongo error');
            } else {
                if (!users) {
                    reject('not founf in DB ');
                } else
                    resolve(users);
            }
        });
    });
};





module.exports = {
    autocompletamento_areamanager,
    autocompletamento_cliente,
    crea_utente,
    creazione_cartella_utente,
    elimina_utente,
    numero_clienti_paginatore,
    numero_utenti_filtrati,
    numero_utenti_paginatore,
    paginatore_clienti,
    paginatore_utenti,
    ricerca_point,
    ricerca_utente_id,
    scarica_immagine_profilo,
    generatesha

};