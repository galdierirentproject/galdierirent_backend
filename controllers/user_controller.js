var User = require('../models/user_model');
var mkdirp = require('mkdirp');
const validator = require('validator');
const { UserInputError, ApolloError } = require('apollo-server-express');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
var path_user_folder = '/var/www/vhosts/galdierirents.info/graphql2.galdierirents.info/users/';
var path = require('path');
var mongoose = require('mongoose');
var path_img_profile = '/profile';
var fs = require('fs');


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
                const error = new UserInputError('Mongo error!!!', {
                    invalidArgs: error,
                    myError: "error_test"
                });
                error.code = 503;
                reject(error);
            } else {
                if (!users) {
                    const error = new UserInputError('User not found!!!', {
                        invalidArgs: error,
                        myError: "error_test"
                    });
                    error.code = 404;
                    reject(error);
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
                const error = new UserInputError('Mongo error!!!', {
                    invalidArgs: error,
                    myError: "error_test"
                });
                error.code = 503;
                reject(error);
            } else {
                if (!users) {
                    const error = new UserInputError('User not found!!!', {
                        invalidArgs: error,
                        myError: "error_test"
                    });
                    error.code = 404;
                    reject(error);
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
                const error = new UserInputError('Mongo error!!!', {
                    invalidArgs: error,
                    myError: "error_test"
                });
                error.code = 503;
                reject(error);
            } else {
                if (!users) {
                    const error = new UserInputError('User not found!!!', {
                        invalidArgs: error,
                        myError: "error_test"
                    });
                    error.code = 404;
                    reject(error);
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
                const error = new UserInputError('Mongo error!!!', {
                    invalidArgs: error,
                    myError: "error_test"
                });
                error.code = 503;
                reject(error);
            } else {
                if (!users) {
                    const error = new UserInputError('User not found!!!', {
                        invalidArgs: error,
                        myError: "error_test"
                    });
                    error.code = 404;
                    reject(error);
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
                    const error = new UserInputError('Users not found!!!', {
                        invalidArgs: err,
                        myError: "error_user"
                    });
                    error.code = 404;
                    reject(error);
                } else {
                    if (!users) {
                        const error = new UserInputError('User not found!!!', {
                            invalidArgs: users,
                            myError: "error_user "
                        });
                        error.code = 404;
                        reject(error);
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

// async function crea_utente(args) {
//     return new Promise(async(resolve, reject) => {
//         const user = args.user;
//         if (user._id == null) {
//             let u = new User();
//             user._id = u._id;
//         }
//         var query = { _id: user._id };
//         user.data = new Date().toLocaleString("en-US", { timeZone: "Europe/Rome" });
//         console.log(user);
//         User.findOneAndUpdate(query, { $set: user }, { upsert: true, new: true }, (err, user) => {
//             const errors = [];
//             if (err) {
//                 errors.push({ message: `Mongo error: ${err}` });
//                 const error = new UserInputError('Mongo error!!!', {
//                     invalidArgs: errors,
//                     myError: "erroprtest"
//                 });
//                 error.code = 422;
//                 reject(error);
//             } else {
//                 if (!user) {
//                     errors.push({ message: `Mongo error ritorna utente null: ${user}` });
//                     errors.push({ message: `Mongo error: ${err}` });
//                     const error = new UserInputError('Mongo error!!!', {
//                         invalidArgs: errors,
//                         myError: "erroprtest"
//                     });
//                     error.code = 422;
//                     reject(error);
//                 } else {
//                     const token = jsonwebtoken.sign({ id: user._id, email: user.email },
//                         process.env.JWT_SECRET, { expiresIn: '1h' }
//                     );
//                     user.token = token;
//                     resolve({ message: `Utente creato: ${user}` });
//                 }
//             }

//         });


//     })
// };
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
                errors.push({ message: `Mongo error: ${err}` });
                const error = new UserInputError('Mongo error!!!', {
                    invalidArgs: errors,
                    myError: "erroprtest"
                });
                error.code = 422;
                reject(error);
            } else {
                if (!user) {
                    errors.push({ message: `Mongo error ritorna utente null: ${user}` });
                    errors.push({ message: `Mongo error: ${err}` });
                    const error = new UserInputError('Mongo error!!!', {
                        invalidArgs: errors,
                        myError: "erroprtest"
                    });
                    error.code = 422;
                    reject(error);
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
                const error = new UserInputError('Mongo error!!!', {
                    invalidArgs: error,
                    myError: "error_test"
                });
                error.code = 503;
                reject(error);
            } else {
                if (!users) {
                    const error = new UserInputError('User not found!!!', {
                        invalidArgs: error,
                        myError: "error_test"
                    });
                    error.code = 404;
                    reject(error);
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
                const error = new UserInputError('Mongo error!!!', {
                    invalidArgs: error,
                    myError: "error_test"
                });
                error.code = 503;
                reject(error);
            }
            if (user) {
                resolve({ message: 'utente cancellato', result: true });
            } else {
                reject({ message: 'utente cancellato', result: true });
            }
        });
    });
};


function ricerca_utente_id(args) {
    return new Promise(async(resolve, reject) => {
        User.findOne({ _id: args.id }, (err, user) => {
            if (err) {
                const error = new UserInputError('Mongo error!!!', {
                    invalidArgs: err,
                    myError: "error_test"
                });
                error.code = 503;
                reject(error);
            } else {
                if (!user) {
                    const error = new UserInputError('User not found!!!', {
                        invalidArgs: user,
                        myError: "error_test"
                    });
                    error.code = 404;
                    reject(error);
                } else {
                    resolve(user);
                }
            }
        });
    });
};

async function scarica_immagine_profilo(req, res) {

    res.sendFile(path.resolve('users/superadmin1@gmail.com/no-avatar-png.png'));
    // var userID = req.query;
    // var ut;
    // console.log("scarica immagine", userID);

    // ut = new Promise(async(resolve, reject) => {

    //     User.aggregate([
    //             { $match: { _id: mongoose.Types.ObjectId(req.query.id) } },
    //             { $project: { username: 1, profile_img: 1 } }
    //         ])
    //         .exec(function(err, user) {
    //             if (err) {
    //                 res.status(500).send({ message: "Moongo error" });
    //             } else {
    //                 if (!user) {
    //                     res.status(404).send({ message: "no data" });
    //                 } else {

    //                     ut = user[0];

    //                     // console.log();
    //                     // res.sendFile(path.join(__dirname, '../users', user[0].username, user[0].profile_img));

    //                     //                        var a = res.sendFile(path.resolve(path_user_folder + user[0].username + "/" + user[0].profile_img));
    //                     resolve(ut);
    //                 }
    //             }
    //         });
    // });
    // var resp;
    // ut.then(result => {
    //resp = res.sendFile('/var/www/vhosts/galdierirents.info/graphql2.galdierirents.info/users/superadmin1@gmail.com/' + 'avatar1.jpg');
    // console.log(res);
    //                        var a = res.sendFile(path.resolve(path_user_folder + user[0].username + "/" + user[0].profile_img));

    // var img = fs.readFileSync(path.join(__dirname, 'avatar1.jpg'); res.writeHead(200, { 'Content-Type': 'image/gif' }); res.end(img, 'binary');
    // let a = res.sendFile(__dirname + '/avatar1.jpg');
    // console.log(a);
    // const options = { root: path.join(__dirname, `../users/${result.username}/`) };
    // console.log(options);
    // res.sendFile(`${result.profile_img}`, options);
    // let a = path.join(path_user_folder, result.username);
    // let b = path.join(a, result.profile_img);
    // console.log("res", path.resolve(b));
    // res.sendFile(path.resolve(b));
    //        next();

    //     res.sendFile(`${result.profile_img}`, {
    //         root: path.join(__dirname, '../users/superadmin1@gmail.com')
    //     }, function(err) {
    //         if (err) {
    //             console.log(err);
    //         }
    //     });

    // });
    //return res.sendFile(path.resolve('users/superadmin1@gmail.com/avatar1.jpg'));
    //    return res;
}
async function ricerca_point() {
    return new Promise(async(resolve, reject) => {
        User.aggregate([
            { $match: { 'nome_point': { $ne: null } } },
            { $group: { _id: '$nome_point' } }
        ]).exec((err, users) => {
            if (err) {
                const error = new UserInputError('Mongo error!!!', {
                    invalidArgs: error,
                    myError: "error_test"
                });
                error.code = 503;
                reject(error);
            } else {
                if (!users) {
                    const error = new UserInputError('User not found!!!', {
                        invalidArgs: error,
                        myError: "error_test"
                    });
                    error.code = 404;
                    reject(error);
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
                const error = new UserInputError('Mongo error!!!', {
                    invalidArgs: error,
                    myError: "error_test"
                });
                error.code = 503;
                reject(error);
            } else {
                if (!users) {
                    const error = new UserInputError('User not found!!!', {
                        invalidArgs: error,
                        myError: "error_test"
                    });
                    error.code = 404;
                    reject(error);
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
                const error = new UserInputError('Mongo error!!!', {
                    invalidArgs: error,
                    myError: "error_test"
                });
                error.code = 503;
                reject(error);
            } else {
                if (!users) {
                    const error = new UserInputError('User not found!!!', {
                        invalidArgs: error,
                        myError: "error_test"
                    });
                    error.code = 404;
                    reject(error);
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