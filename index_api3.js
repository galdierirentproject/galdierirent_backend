'use strict'
var mongoose = require('mongoose');
var app = require('./app');
var fs = require('fs');
var https = require('https');
var config = require('./config');
var port = process.env.PORT || config.graphql_port;
var privateKey = fs.readFileSync(config.privkey_keys, 'utf8');
var certificate = fs.readFileSync(config.cert_keys, 'utf8');
var credentials = { key: privateKey, cert: certificate };
var httpsServer = https.createServer(credentials, app);
var colors = require('colors');

/**
 * Connection mongoDB
 *
 * @author	Mariangela Di Luccia
 */
mongoose.connect(config.database, { useNewUrlParser: true }, (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log(`connect to mongo OK: ${port}`.america);
        httpsServer.listen(port, config.ip, () => {
            console.log(`APIREST/GraphQL ${Date()}`.green);
            console.log(`${config.dominio} (${config.ip}:${port})`);
        });

    }
});