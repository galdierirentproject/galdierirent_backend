//app.js
//***********FILE UPLOAD************************/
var DIR = './uploads/';
var Storage = multer.diskStorage({ //multers disk storage settings
    destination: function(req, file, cb) {
        cb(null, './users/' + req.body.username);
    },
    filename: function(req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.originalname);
    }
});

var upload = multer({ //multer settings
    storage: Storage
}).array('file'); //file è il nome che bisogna darli su postman altrimenti non riconosce il file che stiamo upload

//********************************************************/
//***********FILE UPLOAD************************/
app.get('/api/upload', function(req, res) {
    res.end('file catcher example');
});

app.post('/api/upload', (req, res) => {

    upload(req, res, (err) => {
        if (err) {
            return res.end('apirest grent(error 2): ' + err.toString());
        }

        res.status(200).send('File is uploaded');
        //res.end('File is uploaded');
    });
});
//***********************************************/