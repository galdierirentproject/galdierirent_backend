var City = require('../models/city_model');

const { UserInputError, ApolloError } = require('apollo-server-express');



async function getCitys_graphql() {
    return new Promise(async (resolve, reject) => {
        City.find().exec((err, city) => {
            if (err) {
                const error = new UserInputError('Mongo error!!!', {
                    invalidArgs: errors,
                    myError: "error_test"
                });
                error.code = 503;
                reject(error);
            } else {
                if (!city) {
                    const error = new UserInputError('User not found!!!', {
                        invalidArgs: errors,
                        myError: "error_test"
                    });
                    error.code = 404;
                    reject(error);
                } else
                    resolve(city);
            }
        });
    });
};

async function filteredCity(args) {
    return new Promise(async (resolve, reject) => {
        let query_1 = {};
        query_1['nome'] = new RegExp(args.filtro, 'i');
        let query_2 = {};
        query_2 = query_1, { comuni: 1 };
        City.find(query_2).exec((err, city) => {
            if (err) {
                const error = new UserInputError('Mongo error!!!', {
                    invalidArgs: errors,
                    myError: "error_test"
                });
                error.code = 503;
                reject(error);
            } else {
                if (!city) {
                    const error = new UserInputError('User not found!!!', {
                        invalidArgs: errors,
                        myError: "error_test"
                    });
                    error.code = 404;
                    reject(error);
                } else
                    resolve(city);
            }
        });
    });
};




module.exports = {
    getCitys_graphql,
    filteredCity
}