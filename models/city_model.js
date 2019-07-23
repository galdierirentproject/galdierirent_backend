'use strict'

var mongoose = require('mongoose');

var schema = mongoose.Schema;
var Comuni = schema({
    nome:String
});
var citySchema = schema({
    nome:String,
    comuni: [Comuni]
}
, {
    versionKey: false // You should be aware of the outcome after set to false
});
module.exports = mongoose.model('citys', citySchema);