'use strict'
//import user
var Utente = require('../models/user_model');
//import mongoose
var mongoose = require('mongoose');
var schema = mongoose.Schema;

var fileSchema = schema({
    nome: String,
    descrizione: String,
    dimensione: Number,
    tipo: String,
    data: Date

})
var noteSchema = schema({
    note: String,
    date: Date
})
var azioneSchema = schema({
    descrizione: String,
    nota: String,
    utente: Utente.schema,
    file: [fileSchema],
    data: Date
})

var statoSchema = schema({
    nome: String,
    numero: Number,
    azioni: [azioneSchema]
})
var praticesSchema = schema({
    alimentazione: String,
    allestimento: String,
    anticipo: Number,
    auto_sostitutiva: Boolean,
    auto_sostitutiva_gruppo: String,
    casa_locatrice: String,
    casa_locatrice_preferenza: String,
    chilometri: Number,
    cliente: Utente.schema,
    codice_costruttore: String,
    codice_marca: String,
    codice_modello: String,
    colore_esterno: String,
    colore_interno: String,
    durata: Number,
    forma_anticipo: String,
    franchigia_furto: Number,
    franchigia_kasko: Number,
    franchigia_rca: Number,
    fuel_card: Boolean,
    infocar: String,
    luogo_consegna: String,
    marca: String,
    modello: String,
    note: String,
    note_allegati: String,
    note_preventivo: String,
    optional: [String],
    pneumatici_estivi_metodo: String,
    pneumatici_estivi_numero: Number,
    pneumatici_estivi_performance: String,
    pneumatici_invernali_metodo: String,
    pneumatici_invernali_performance: String,
    pneumatici_invernali_numero: Number,
    prodotto: String,
    provvigioni: Number,
    provvigioni_definitive: Number,
    provvigioni_percentuale: Number,
    provvigioni_richieste: Number,
    sostituzione_pneumatici: Boolean,
    data: Date,
    stato: [statoSchema],
    consulente: Utente.schema,
}, {
    versionKey: false
});
//Global collection
const pratices = mongoose.model('pratice', praticesSchema);
//state collection

//init state
const state_000 = mongoose.model('000_state', praticesSchema);
const state_001 = mongoose.model('001_state', praticesSchema);
const state_002 = mongoose.model('002_state', praticesSchema);
const state_003 = mongoose.model('003_state', praticesSchema);
const state_004 = mongoose.model('004_state', praticesSchema);
const state_005 = mongoose.model('005_state', praticesSchema);
const state_006 = mongoose.model('006_state', praticesSchema);
const state_007 = mongoose.model('007_state', praticesSchema);
const state_008 = mongoose.model('008_state', praticesSchema);
const state_009 = mongoose.model('009_state', praticesSchema);
const state_010 = mongoose.model('010_state', praticesSchema);
const state_011 = mongoose.model('011_state', praticesSchema);
const state_012 = mongoose.model('012_state', praticesSchema);
module.exports = {
    state_000,
    state_001,
    state_002,
    state_003,
    state_004,
    state_005,
    state_006,
    state_007,
    state_008,
    state_009,
    state_010,
    state_011,
    state_012,
    pratices
}