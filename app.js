'use strict'
//EXPRESS
import express from 'express';
var bodyParser = require('body-parser');
var app = express();
// GRAPHQL IMPORT 
const { ApolloServer } = require('apollo-server-express');
const schema_ = require('./graphql/controler_graphql');
var secureRoutes = express.Router();
var api = require('./routes/user_routes');
var jwt = require('jsonwebtoken');
//CORS
const cors = require('cors');
app.use(cors());
//IMPORT CONFING
var config = require('./config');
var favicon = require('serve-favicon');
var path = require('path');
//ico
app.use(favicon(path.join(__dirname, 'public', 'galdierirent.ico')))
require('dotenv').config();
//upload
const fileUpload = require('express-fileupload');
app.use(fileUpload());
app.use(express.static(__dirname+'/users'));

//header
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-API-KEY,Origin, X-Request-With, content-type, Content-Type, Access-Controll-Request-Method, cache-control, token');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, DELETE, POST, OPTIONS');
    res.header('Allow', 'GET, PUT, DELETE, POST, OPTIONS');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});
//secure path
app.use('/secure-api', secureRoutes);

//APOLLO INSTANCE CONNECTION
const server = new ApolloServer({
    schema: schema_.schema,
    context: ({ req }) => {
        if (!req.headers.authorization) {
            return { result: '' };

        }
        const tokenWithBearer = req.headers.authorization || "";
        return { result: tokenWithBearer };
    },
    formatError(err) {
        if (!err.originalError) {
            return err;
        }
        return err;
    }
});
server.applyMiddleware({ app });

//secure path check token
secureRoutes.use((req, res, next) => {
    var token = req.query.token || req.headers['Bearer'];
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, function(err, decode) {
            if (err) {
                res.status(500).send("Invalid Token");

            } else {
                next();
            }
        })
    } else {
        next();
    }
});
secureRoutes.use('/api', api);


module.exports = app;