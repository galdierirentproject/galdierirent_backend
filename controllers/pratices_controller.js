/**
 * This controller performs all the functions inherent to the practice
 * @author Mariangela Di Luccia
 * 
 */


'use strict'
//import model moongoose global pratice
var Pratices = require('../models/pratices_model');
const { UserInputError } = require('apollo-server-express');
//import mkdir for create the folder pratice 
var mkdirp = require('mkdirp');
//path folder 
const path_folder = '/var/www/vhosts/galdierirent.info/graphql.galdierirent.info';
//file system for upload
const fs = require('fs')

/**
 *the mongoose collection returns based on the state of the practice
 *
 * @param {String} args Name state pratice
 * @return {mongooseObject} The new Circle object.
 */
function StateSwitch(args) {
    switch (args) {
        case "PREVENTIVAZIONE":
            return Pratices.state_000;
        case "PRESA_IN_CONSEGNA_PREVENTIVO":
            return Pratices.state_001;
        case "RIGETTO_PREVENTIVO":
            return Pratices.state_002;
        case "INVIO_PREVENTIVO":
            return Pratices.state_003;
        case "PREVENTIVO_ACCETTATO_VENDITORE":
            return Pratices.state_004;
        case "PREVENTIVO_RIFIUTATO_VENDITORE":
            return Pratices.state_005;
        case "DOCUMENTI_CARICATI_CLIENTE":
            return Pratices.state_006;
        case "RENT_ACCETTATA":
            return Pratices.state_007;
        case "RENT_RIFIUTATA":
            return Pratices.state_008;
        case "RENT_CONDIZIONATA":
            return Pratices.state_009;
        case "CARICA_RENT":
            return Pratices.state_010;
        case "SVILUPPA_RENT":
            return Pratices.state_011;
        default:
            return undefined;
    }
}
/**
 * This method allows you to search for a practice in the db
 * @param {String} filterValue value to be searched in the db
 * @param {String} selection_key key on which to search.
 * @returns {Pratice} selection_key key on which to search.
 * Pratices.state_000 is collection only state 0
 */
async function ricerca_pratica_stato(args) {
    return new Promise(async(resolve, reject) => {
        var stato = args.stato;
        var collection = StateSwitch(stato);
        collection.findOne({ _id: args.id }, (err, pratice) => {
            if (err) {
                const error = new UserInputError('Mongo error!!!', {
                    invalidArgs: err,
                    myError: "error_test"
                });
                error.code = 503;
                reject(error);
            } else {
                if (!pratice) {
                    const error = new UserInputError('User not found!!!', {
                        invalidArgs: pratice,
                        myError: "error_test"
                    });
                    error.code = 404;
                    reject(error);
                } else {
                    resolve(pratice);
                }
            }
        });
    });
};
/**
 * Returns only pratices sent by a consultant based on his username
 * @param {Int} skip number of pages to be skipped
 * @param {Int} limit maximum number of files to be returned
 * @param {String} username seller's username
 * @returns {Pratices} Pratices found in db 
 * @returns {Pratices} Number of files found
 */
async function paginatore_richieste_inviate_stato(args) {
    return new Promise(async(resolve, reject) => {
        var params = args;
        var skip = parseInt(params.skip);
        var limit = parseInt(params.limit);
        var user_seller = params.username;
        var stato = args.stato;
        var collection = StateSwitch(stato);
        collection.aggregate(
                [
                    { $match: { 'consulente.username': user_seller } },
                    {
                        $project: {
                            utente: { $concat: ['$consulente.nome', " - ", '$consulente.cognome'] },
                            cliente: { $concat: ['$cliente.nome', " - ", '$cliente.cognome'] },
                            piva: '$cliente.piva',
                            chilometri: '$chilometri',
                            durata: '$durata',
                            data: '$data',
                            veicolo: { $concat: ["$marca", " - ", "$modello"] },
                            stato: { $arrayElemAt: ["$stato.nome", -1] }
                        }
                    }
                ]
            ).sort({ _id: -1 }).skip(skip * limit).limit(limit)
            .exec(function(err, pratice) {
                if (err) {
                    const error = new UserInputError('Mongo error!!!', {
                        invalidArgs: err,
                        myError: "erroprtest"
                    });
                    error.code = 422;
                    console.log('errore:', err);
                } else {
                    if (!pratice) {
                        const error = new UserInputError('No data!!!', {
                            invalidArgs: err,
                            myError: "erroprtest"
                        });
                        error.code = 404;
                    } else {
                        console.log('sto per risolvere', pratice.length);
                        if (pratice.length === 0) {
                            console.log('vuota');
                        }
                        resolve(pratice);
                    }
                }
            });
    });
}
/**
 * Returns only number pratices in db
 * @param {Int} skip number of pages to be skipped
 * @param {Int} limit maximum number of files to be returned
 * @param {String} username seller's username
 * @returns {Pratices} Pratices found in db 
 * @returns {Pratices} Number of files found
 */
async function numero_richieste_inviate_stato(args) {
    return new Promise(async(resolve, reject) => {
        var stato = args.stato;
        var user_seller = args.user_seller;
        var collection = StateSwitch(stato);
        collection.find({ 'consulente.username': user_seller }).count()
            .exec(function(err, pratice) {
                if (err) {
                    const error = new UserInputError('Mongo error!!!', {
                        invalidArgs: err,
                        myError: "erroprtest"
                    });
                    error.code = 422;
                } else {
                    if (!pratice) {
                        const error = new UserInputError('No data!!!', {
                            invalidArgs: err,
                            myError: "erroprtest"
                        });
                        error.code = 404;
                    } else {
                        resolve(pratice);
                    }
                }
            });
    });
}
/**
 *Controller for* Return all practices that reside in state 0
 * @param {Int} skip number of pages to be skipped
 * @param {Int} limit maximum number of files to be returned
 * @returns {Pratices} Pratices found in db 
 * @returns {Int} Number of files found
 */
// async function paginatore_richieste_ricevute_stato(args) {
//     return new Promise(async(resolve, reject) => {
//         var params = args;
//         var username = args.utente;
//         var query = {};
//         var skip = parseInt(params.skip);
//         var limit = parseInt(params.limit);
//         var stato = args.stato;
//         var collection = StateSwitch(stato);
//         console.log(username);
//         collection.aggregate(
//                 [{
//                     $project: {
//                         cliente: { $concat: ["$cliente.nome", " - ", "$cliente.cognome"] },
//                         piva: '$cliente.piva',
//                         km: '$chilometri',
//                         sconto: '$sconto',
//                         allegati: '$allegati',
//                         durata: '$durata',
//                         data: '$data',
//                         commissioni: '$provvigioni_richieste',
//                         veicolo: { $concat: ["$marca", " - ", "$modello"] },
//                         utente: { $concat: ["$consulente.nome", " - ", "$consulente.cognome"] },
//                         stato: { $arrayElemAt: ["$stato.nome", -1] }
//                     }
//                 }]
//             ).sort({ _id: -1 }).skip(skip * limit).limit(limit)
//             .exec(function(err, pratice) {
//                 if (err) {
//                     const error = new UserInputError('Mongo error!!!', {
//                         invalidArgs: err,
//                         myError: "erroprtest"
//                     });
//                     error.code = 422;
//                 } else {
//                     if (!pratice) {
//                         const error = new UserInputError('No data!!!', {
//                             invalidArgs: err,
//                             myError: "erroprtest"
//                         });
//                         error.code = 404;
//                     } else {
//                         console.log(pratice);
//                         resolve(pratice);
//                     }
//                 }
//             });
//     });
// }
async function paginatore_richieste_ricevute_stato(args) {
    return new Promise(async(resolve, reject) => {
        console.log('inviate', args);
        var params = args;
        var skip = parseInt(params.skip);
        var limit = parseInt(params.limit);
        var stato = args.stato;
        var collection = StateSwitch(stato);
        console.log(collection);
        collection.aggregate(
                [{
                    $project: {
                        utente: { $concat: ['$consulente.nome', " - ", '$consulente.cognome'] },
                        cliente: { $concat: ['$cliente.nome', " - ", '$cliente.cognome'] },
                        piva: '$cliente.piva',
                        chilometri: '$chilometri',
                        durata: '$durata',
                        data: '$data',
                        veicolo: { $concat: ["$marca", " - ", "$modello"] },
                        stato: { $arrayElemAt: ["$stato.nome", -1] }
                    }
                }]
            ).sort({ _id: -1 }).skip(skip * limit).limit(limit)
            .exec(function(err, pratice) {
                if (err) {
                    const error = new UserInputError('Mongo error!!!', {
                        invalidArgs: err,
                        myError: "erroprtest"
                    });
                    error.code = 422;
                } else {
                    if (!pratice) {
                        const error = new UserInputError('No data!!!', {
                            invalidArgs: err,
                            myError: "erroprtest"
                        });
                        error.code = 404;
                    } else {
                        console.log(pratice);
                        resolve(pratice);
                    }
                }
            });
    });
}

/**
 * Controller for return numer pratices in state 0
 * @param {Int} skip number of pages to be skipped
 * @param {Int} limit maximum number of files to be returned
 * @returns {Pratices} Pratices found in db 
 * @returns {Int} Number of files found
 */
async function numero_richieste_ricevute_stato(stato) {
    return new Promise(async(resolve, reject) => {
        var collection = StateSwitch(stato);
        collection.find({}).count()
            .exec(function(err, pratice) {
                if (err) {
                    const error = new UserInputError('Mongo error!!!', {
                        invalidArgs: err,
                        myError: "erroprtest"
                    });
                    error.code = 422;
                } else {
                    if (!pratice) {
                        const error = new UserInputError('No data!!!', {
                            invalidArgs: err,
                            myError: "erroprtest"
                        });
                        error.code = 404;
                    } else {
                        resolve(pratice);
                    }
                }
            });
    });
}

/**
 * This method searches for a value in the DB by specifying a field to search
 * @param {String} filterValue value to be searched in the db
 * @param {String} selection_key key on which to search.
 * @returns {Pratices} Return the files containing the value specified as a key
 */
async function filtro_ricerca_stato(args) {
    return new Promise(async(resolve, reject) => {
        var stato = args.stato;
        var collection = StateSwitch(stato);
        var filterValue = args.filterValue;
        var selection_key = args.selection_key;
        if ((filterValue != "") && (selection_key != "")) {
            var query = {};
            switch (selection_key) {
                case "durata":
                    query = { "durata": parseInt(filterValue) }
                    break;
                case "chilometri":
                    query = { "chilometri": parseInt(filterValue) }
                    break;
                case "chilometri":
                    query = { "chilometri": parseInt(filterValue) }
                    break;
                case "cliente":
                    let query_1 = {};
                    let query_2 = {};
                    let query_3 = {};
                    query_1['cliente.nome'] = new RegExp(filterValue, 'i');
                    query_2['cliente.cognome'] = new RegExp(filterValue, 'i');
                    query_3['cliente.cf'] = new RegExp(filterValue, 'i');
                    query = { $or: [query_1, query_2, query_3] };
                    break;
                case "veicolo":
                    let query_v1 = {};
                    let query_v2 = {};
                    query_v1['marca'] = new RegExp(filterValue, 'i');
                    query_v2['modello'] = new RegExp(filterValue, 'i');
                    query = { $or: [query_v1, query_v2] };
                    break;
                case "commissioni":
                    query = { "provvigioni_definitive": parseInt(filterValue) }
                    break;
                default:
                    query[selection_key] = new RegExp(filterValue, 'i');
                    break;
            }
            collection.aggregate(
                [
                    { $match: query },
                    {
                        $project: {
                            utente: { $concat: ['$consulente.nome', " - ", '$consulente.cognome'] },
                            cliente: { $concat: ['$cliente.nome', " - ", '$cliente.cognome'] },
                            piva: '$cliente.piva',
                            chilometri: '$chilometri',
                            durata: '$durata',
                            data: '$data',
                            veicolo: { $concat: ["$marca", " - ", "$modello"] },
                            stato: { $arrayElemAt: ["$stato.nome", -1] }
                        }
                    }
                ]
            ).sort({ _id: -1 }).exec(function(err, pratice) {
                if (err) {
                    console.log(err);
                    const error = new UserInputError('Pratice not found!!!', {
                        invalidArgs: err,
                        myError: "error_pratice"
                    });
                    error.code = 404;
                    reject(error);
                } else {
                    if (!pratice) {
                        const error = new UserInputError('Pratice not found!!!', {
                            invalidArgs: users,
                            myError: "error_pratice "
                        });
                        error.code = 404;
                        reject(error);
                    } else {
                        console.log(pratice);
                        resolve(pratice);
                    }
                }
            });
        }
    });
}
/**
 * creation of practice folder named with practice id
 * @param {Pratice} pratice practice ready for creation 
 * @returns {boolean} returns a truth value based on the successful creation of the folder
 */
async function crea_cartella_pratica(pratice) {
    return new Promise(async(resolve, reject) => {
        mkdirp(path_folder + '/pratices/' + pratice._id, (err_mkdi) => {
            resolve(true);
        });
    });
}
/**
 * elimination of the practice from state 0
 * @param {ID} id id pratice
 * @returns {Message} indicates success or failure
 */
async function elimina_pratica_stato(args) {
    return new Promise(async(resolve, reject) => {
        let praticeID = args.id;
        var stato = args.stato;
        var collection = StateSwitch(stato);
        collection.findOneAndDelete({ '_id': praticeID }, (err, ParticularPratice) => {
            if (err) {
                reject({ message: "No data" });
            } else
                resolve({ message: 'utente cancellato', result: true });
        });
    });
};
/**
 * Creation and updating of a practice
 * @param {Stato} stato next state of practice
 * @param {Pratica} pratica new practice or updated practice
 * @returns {Pratices} Pratices found in db 
 * @returns {Int} Number of files found
 */
async function creazione_spostamento_pratica_old(args) {
    return new Promise((resolve, reject) => {
        var pratica_input = args.pratica;
        //next state recovery from input
        var stato_input = args.stato;
        stato_input.date == Date.now();
        pratica_input.data = Date.now();

        //compare the previous state with the next one
        //init pratice 
        if (pratica_input.stato === null) {
            let a = [];
            a.push(stato_input);
            pratica_input.stato = stato_input;
            let p = new Pratices.pratices();
            pratica_input._id = p._id;
            pratica_input.consulente = stato_input.azioni[0].utente;
            Pratices.state_000.findOneAndUpdate({ _id: pratica_input._id }, { $set: pratica_input }, { new: true, upsert: true }, (err, ParticularPratice) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(2);
                }
            });
        }
        //ultimate state pratice 
        else if (pratica_input.stato[pratica_input.stato.length - 1].numero != stato_input.numero) {
            var retGlobalPratice = StateSwitch(pratica_input.stato[pratica_input.stato.length - 1].nome);
            console.log('diverso', pratica_input.stato[pratica_input.stato.length - 1], stato_input.numero, retGlobalPratice);
            pratica_input.stato.push(stato_input);
            retGlobalPratice.findOneAndDelete({ _id: pratica_input._id }, (err, ParticularPratice) => {
                if (err) {
                    console.log(err);
                } else
                    console.log(5);
            });
            retGlobalPratice = StateSwitch(pratica_input.stato[pratica_input.stato.length - 1].nome);
            retGlobalPratice.findOneAndUpdate({ _id: pratica_input._id }, { $set: pratica_input }, { new: true, upsert: true }, (err, ParticularPratice) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(1);
                }
            });
        } else if (pratica_input.stato[pratica_input.stato.length - 1].numero = stato_input.numero) {
            var retGlobalPratice = StateSwitch(pratica_input.stato[pratica_input.stato.length - 1].nome);
            console.log('ultimo stato uguale', pratica_input.stato[pratica_input.stato.length - 1].numero, stato_input.numero);
            stato_input.azioni.forEach(element => {
                console.log(element);
                pratica_input.stato[pratica_input.stato.length - 1].azioni.push(element);
            });
            retGlobalPratice.findOneAndUpdate({ _id: pratica_input._id }, { $set: pratica_input }, { new: true, upsert: true }, (err, ParticularPratice) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(stato_input.azioni);
                    console.log(0, );
                }
            });
        }

        //I verify in which of the collections where it is currently located
        // var retGlobalPratice = StateSwitch(GlobalPratice.stato[GlobalPratice.stato.length - 1].nome);
        //I look for in the collection of where the practice is

        //I search in the global collection
        //if I find the id it is an update otherwise a creation
        Pratices.pratices.findOneAndUpdate({ _id: pratica_input._id }, { $set: pratica_input }, { new: true, upsert: true }, (err, GlobalPratice) => {
            if (err) {
                console.log(err);
                reject({ message: 'globalPratice' + err });
            } else {
                console.log(3);
                resolve({ message: 'ok' });
            }
        });

    })
};



async function creazione_spostamento_pratica(args) {
    return new Promise((resolve, reject) => {
        var pratica_input = args.pratica;
        //next state recovery from input
        var stato_input = args.stato;
        if (pratica_input._id) {
            let num_ultimo_stato = pratica_input.stato[pratica_input.stato.length - 1];
            if (num_ultimo_stato.numero === stato_input.numero) {
                stato_input.azioni.forEach(element => {
                    num_ultimo_stato.azioni.push(element);
                });
            } else {
                num_ultimo_stato.stato.push(stato_input);
            }
            var retGlobalPratice = StateSwitch(pratica_input.stato[pratica_input.stato.length - 1].nome);
            retGlobalPratice.findOneAndUpdate({ _id: pratica_input._id }, { $set: pratica_input }, { new: true, upsert: true }, (err, ParticularPratice) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(0);
                }
            });
        } else {
            //nuova pratica
            pratica_input._id = new Pratices.state_000()._id;
            pratica_input.stato = stato_input;
            Pratices.state_000.findOneAndUpdate({ _id: pratica_input._id }, { $set: pratica_input }, { new: true, upsert: true }, (err, ParticularPratice) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(2);
                }
            });
        }
        //alla fine aggiorno la pratica globale
        Pratices.pratices.findOneAndUpdate({ _id: pratica_input._id }, { $set: pratica_input }, { new: true, upsert: true }, (err, GlobalPratice) => {
            if (err) {
                console.log(err);
                reject({ message: 'globalPratice' + err });
            } else {
                console.log(3);
                resolve({ message: 'ok' });
            }
        });



    })
};

/**
 * elimination file
 * @param {ID} id_pratice  identification pratice 
 * @param {File} file file to delete
 * @returns {Message} indicates success or failure
 */
async function elimina_file(args) {
    return new Promise(async(resolve, reject) => {
        let path = path_folder + '/pratices/' + args.id_pratica + '/' + args.file.nome;
        fs.unlink(path, (err) => {
            if (err) {
                reject(err);
            }
            resolve({ message: 'file cancellato', result: true });
        });
    });
}

module.exports = {
    crea_cartella_pratica,
    creazione_spostamento_pratica,
    elimina_pratica_stato,
    filtro_ricerca_stato,
    numero_richieste_inviate_stato,
    numero_richieste_ricevute_stato,
    paginatore_richieste_inviate_stato,
    paginatore_richieste_ricevute_stato,
    ricerca_pratica_stato,
    elimina_file,
}