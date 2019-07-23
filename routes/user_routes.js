'use strict'

var express = require('express');
var path = require('path');

var userController = require('../controllers/user_controller');
var api = express.Router();
api.get('/img', userController.scarica_immagine_profilo);

module.exports = api;