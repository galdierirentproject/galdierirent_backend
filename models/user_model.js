'use strict'

var mongoose = require('mongoose');

var schema = mongoose.Schema;
var navbar = schema({
    primaryBackground: String,
    secondaryBackground: String,
    folded: Boolean,
    hidden: Boolean,
    position: String,
    variant: String
});
var toolbar = schema({
    customBackgroundColor: Boolean,
    background: String,
    hidden: Boolean,
    position: String,
});
var footer = schema({
    customBackgroundColor: Boolean,
    background: String,
    hidden: Boolean,
    position: String,
});
var sidepanel = schema({
    hidden: Boolean,
    position: String,
});
var layout = schema({
    style: String,
    width: String,
    navbar,
    toolbar,
    footer,
    sidepanel
});

var sede = schema({
    provincia: String,
    comune: String,
    cap: String,
    indirizzo: String
});
var userSchema = schema({
    img: [schema.Types.Mixed],
    sha512: String,
    img: [String],
    nome: String,
    cognome: String,
    username: String,
    password: String,
    email: String,
    state: String,
    ruolo: String,
    profile_img: String,
    room: String,
    telefono: String,
    cellulare: String,
    titolo: String,
    azienda: String,
    indirizzo: String,
    cap: String,
    provincia: String,
    comune: String,
    cf: String,
    piva: String,
    token: String,
    fuseconfig: { colorTheme: String, customScrollbars: Boolean, layout },
    sede: sede,
    sede_point: sede,
    data: Date,
    regionesociale: String,
    tipologiacliente: String,
    inizioattivita: Boolean,
    consulente: schema.Types.Mixed,
    areamanager: schema.Types.Mixed,
    nome_point: String,
}, {
    versionKey: false
});
module.exports = mongoose.model('user', userSchema);