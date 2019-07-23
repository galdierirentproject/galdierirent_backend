'use strict'

var mongoose = require('mongoose');

var schema = mongoose.Schema;

var productWebSchema = schema({
    gruppo: String,
    infocar: String,
    marca: String,
    modello: String,
    allestimento: String,
    optionals: [String],
    alimentazione: String,
    rata: Number,
    anticipo: Number,
    durata: Number,
    chilometri: Number,
    foto: String,
    foto_principale: String,
    foto_dettaglio: String,
    data: Date,
    n_ordine: Number,
    marchio: String,
    servizi_inclusi: [String],
    a_partire_da: Number,
    tipologia: String,
    prezzo_listino: Number,
    commissione: Number,
    optional4r: String,
    veicolo4r: String,
    blocca_personalizzazione: Boolean
}, {
    versionKey: false
});
module.exports = mongoose.model('productWeb', productWebSchema);