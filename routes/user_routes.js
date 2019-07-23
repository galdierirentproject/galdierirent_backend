<<<<<<< HEAD
'use strict'

var express = require('express');
var path = require('path');

var userController = require('../controllers/user_controller');
var api = express.Router();
api.get('/img', userController.scarica_immagine_profilo);

=======
'use strict'

var express = require('express');
var path = require('path');

var userController = require('../controllers/user_controller');
var api = express.Router();
api.get('/avatar/:id/:token', userController.scarica_immagine_profilo);
api.get('/img', (req, res) => {

        res.contentType('image/jpeg');
        //    res.send(result.image.buffer)
        // res.sendFile(path.resolve('users/superadmin1@gmail.com/'));
            
        return res.sendFile(path.join(__dirname, '../users/superadmin1@gmail.com/avatar1.jpg'));

        console.log(path.join(__dirname, '../users/superadmin1@gmail.com/'));
    })
    //******************************UPLOAD FILES**********************************************//
    // api.post('/uploadsecurity', imageController.uploadFile);
    // api.post('/profile', imageController.profile);
    // api.get('/avatar/:id', imageController.uploadImgProfile);
    // api.get('/filelist/:id', imageController.fileList);
    //*****************PONT********************************************************//

>>>>>>> f8b1c5fcaba93d0e45e6b067b560004a5abc578d
module.exports = api;