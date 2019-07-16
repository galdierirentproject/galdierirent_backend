'use strict'

var mongoose = require('mongoose');

var schema = mongoose.Schema;

var carSchema = schema({
    brand:String,
    models: [String]
}
, {
    versionKey: false // You should be aware of the outcome after set to false
});
module.exports = mongoose.model('car', carSchema);