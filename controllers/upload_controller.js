import fs from 'fs';

async function upload(stream, filename, _id) {
    var UPLOAD_DIR = './pratices/' + _id;

    const path = `${UPLOAD_DIR}/${filename}`
    return new Promise(async(resolve, reject) => {
        stream
            .on('error', error => {
                if (stream.truncated)
                    fs.unlinkSync(path)
                reject(error)
            })
            .pipe(fs.createWriteStream(path))
            .on('error', error => reject(error));
        resolve("ok");
    });
}
async function upload_img_profilo(stream, filename, _id) {
    var UPLOAD_DIR = './users/' + _id;

    const path = `${UPLOAD_DIR}/${filename}`
    return new Promise(async(resolve, reject) => {
        stream
            .on('error', error => {
                if (stream.truncated)
                    fs.unlinkSync(path)
                reject(error)
            })
            .pipe(fs.createWriteStream(path))
            .on('error', error => reject(error));
        resolve("ok");
    });
}


module.exports = {
    upload,
    upload_img_profilo
}