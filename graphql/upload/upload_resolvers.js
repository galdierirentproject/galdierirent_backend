/**
 * This class receives the requests for upload
 * @author Mariangela Di Luccia
 * 
 */
const fs = require('fs')
const path = require('path')

var upload_controller = require('../../controllers/upload_controller');
//scalar type
import { GraphQLUpload } from 'graphql-upload';
const resolver_upload = {
    Upload: GraphQLUpload,
    Query: {
        uploads: (parent, args) => {},
    },
    Mutation: {
        /**
         * uploading a file to the practice folder
         * @param {ID} id_pratice  identification pratice 
         * @param {File} file file to delete
         * @returns {Message} indicates success or failure
         */
        carica_file: async(parent, args) => {
            const { filename, mimetype, createReadStream } = await args.file;
            const stream = fs.createReadStream(args.file.name);
            const result = await upload_controller.upload(stream, args.file.name, args._id);
            return result;
        },
        carica_img_profilo: async(parent, args) => {
            // console.log('carico img', args);
            // const { filename, mimetype, createReadStream } = await args.file;
            // const stream = fs.createReadStream(args.file.name);
            // const result = await upload_controller.upload_img_profilo(stream, args.file.name, args._id);
            // return result;


          var newPath = '/var/www/vhosts/galdierirents.info/graphql2.galdierirents.info/users/superadmin1@gmail.com/' + args.file.name;
          await fs.writeFile(newPath, args.file, function (err) {
            console.log(err);
            if(err){
                return 'Upload fallito';
            }
          });

          return 'upload ok';
          
        }
    },
};

module.exports = { resolver_upload };