var ProductWeb = require('../models/productWeb_model');
const { UserInputError } = require('apollo-server-express');


async function mutationProductWeb(args) {
    return new Promise(async (resolve, reject) => {
        const productWeb = args.productWeb;
        if (productWeb._id == null) {
            let p = new ProductWeb();
            productWeb._id = p._id;
        }
        var query = { _id: productWeb._id };
        ProductWeb.findOneAndUpdate(query, { $set: productWeb }, { upsert: true, new: true }, (err, productWeb) => {
            const errors = [];
            if (err) {
                errors.push({ message: `Mongo error: ${err}` });
                const error = new UserInputError('Mongo error!!!', {
                    invalidArgs: errors,
                    myError: "erroprtest"
                });
                error.code = 422;
                reject(error);
            } else {
                if (!productWeb) {
                    errors.push({ message: `Mongo error ritorna utente null: ${productWeb}` });
                    errors.push({ message: `Mongo error: ${err}` });
                    const error = new UserInputError('Mongo error!!!', {
                        invalidArgs: errors,
                        myError: "erroprtest"
                    });
                    error.code = 422;
                    reject(error);
                } else {
                    resolve(productWeb);
                }
            }
        });
    })
};

async function getProductWebs() {
    return new Promise(async (resolve, reject) => {
        ProductWeb.find({}, (err, productWeb) => {
            if (err) {
                const error = new UserInputError('Mongo error!!!', {
                    invalidArgs: err,
                    myError: "error_test"
                });
                error.code = 503;
                reject(error);
            } else {
                if (!productWeb) {
                    const error = new UserInputError('User not found!!!', {
                        invalidArgs: productWeb,
                        myError: "error_test"
                    });
                    error.code = 404;
                    reject(error);
                } else {
                    resolve(productWeb);
                }
            }
        });
    });
};

async function getProductWebById(args) {
    return new Promise(async (resolve, reject) => {
        ProductWeb.findOne({ _id: args._id }, (err, productWeb) => {
            if (err) {
                const error = new UserInputError('Mongo error!!!', {
                    invalidArgs: err,
                    myError: "error_test"
                });
                error.code = 503;
                reject(error);
            } else {
                if (!productWeb) {
                    const error = new UserInputError('User not found!!!', {
                        invalidArgs: productWeb,
                        myError: "error_test"
                    });
                    error.code = 404;
                    reject(error);
                } else {
                    resolve(productWeb);
                }
            }
        });
    });
};



module.exports = {
    mutationProductWeb,
    getProductWebs,
    getProductWebById

};