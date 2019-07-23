<<<<<<< HEAD
var Car = require('../models/cars_model');
const { UserInputError } = require('apollo-server-express');

async function getCars() {
    return new Promise(async (resolve, reject) => {
        Car.find().exec((err, cars) => {
            if (err) {
                const error = new UserInputError('Mongo error!!!', {
                    invalidArgs: errors,
                    myError: "error_test"
                });
                error.code = 503;
                reject(error);
            } else {
                if (!cars) {
                    const error = new UserInputError('User not found!!!', {
                        invalidArgs: errors,
                        myError: "error_test"
                    });
                    error.code = 404;
                    reject(error);
                } else
                    resolve(cars);
            }
        });
    });
};


async function filteredModels(args) {
    return new Promise(async (resolve, reject) => {
        console.log(args);
        let query_1 = {};
        let query_2 = {};

        query_1['brand'] = args.brand;
        query_2['models'] = new RegExp(args.filtro, 'i');

        let query_3 = {};


        query_3 = { $and: [query_1, query_2] };

        Car.find(query_3).exec((err, cars) => {
            if (err) {
                const error = new UserInputError('Mongo error!!!', {
                    invalidArgs: errors,
                    myError: "error_test"
                });
                error.code = 503;
                reject(error);
            } else {
                if (!cars) {
                    const error = new UserInputError('User not found!!!', {
                        invalidArgs: errors,
                        myError: "error_test"
                    });
                    error.code = 404;
                    reject(error);
                } else
                console.log(cars.models);
                    resolve(cars);
            }
        });
    });
};

async function filteredBrands(args) {
    console.log(args);
    return new Promise(async (resolve, reject) => {
        let query_1 = {};
        query_1['brand'] = new RegExp(args.filtro, 'i');
        let query_2 = {};
        query_2 = query_1, { models: 1 };
        Car.find(query_2).exec((err, cars) => {
            if (err) {
                const error = new UserInputError('Mongo error!!!', {
                    invalidArgs: errors,
                    myError: "error_test"
                });
                error.code = 503;
                reject(error);
            } else {
                if (!cars) {
                    const error = new UserInputError('User not found!!!', {
                        invalidArgs: errors,
                        myError: "error_test"
                    });
                    error.code = 404;
                    reject(error);
                } else
                    resolve(cars);
            }
        });
    });
};




module.exports = {
    getCars,
    filteredModels,
    filteredBrands
=======
var Car = require('../models/cars_model');
const { UserInputError } = require('apollo-server-express');

async function getCars() {
    return new Promise(async (resolve, reject) => {
        Car.find().exec((err, cars) => {
            if (err) {
                const error = new UserInputError('Mongo error!!!', {
                    invalidArgs: errors,
                    myError: "error_test"
                });
                error.code = 503;
                reject(error);
            } else {
                if (!cars) {
                    const error = new UserInputError('User not found!!!', {
                        invalidArgs: errors,
                        myError: "error_test"
                    });
                    error.code = 404;
                    reject(error);
                } else
                    resolve(cars);
            }
        });
    });
};


async function filteredModels(args) {
    return new Promise(async (resolve, reject) => {
        let query_1 = {};
        let query_2 = {};

        query_1['brand'] = args.brand;
        query_2['models'] = new RegExp(args.filtro, 'i');

        let query_3 = {};


        query_3 = { $and: [query_1, query_2] };

        Car.find(query_3).exec((err, cars) => {
            if (err) {
                const error = new UserInputError('Mongo error!!!', {
                    invalidArgs: errors,
                    myError: "error_test"
                });
                error.code = 503;
                reject(error);
            } else {
                if (!cars) {
                    const error = new UserInputError('User not found!!!', {
                        invalidArgs: errors,
                        myError: "error_test"
                    });
                    error.code = 404;
                    reject(error);
                } else
                    resolve(cars);
            }
        });
    });
};

async function filteredBrands(args) {
    return new Promise(async (resolve, reject) => {
        let query_1 = {};
        query_1['brand'] = new RegExp(args.filtro, 'i');
        let query_2 = {};
        query_2 = query_1, { models: 1 };
        Car.find(query_2).exec((err, cars) => {
            if (err) {
                const error = new UserInputError('Mongo error!!!', {
                    invalidArgs: errors,
                    myError: "error_test"
                });
                error.code = 503;
                reject(error);
            } else {
                if (!cars) {
                    const error = new UserInputError('User not found!!!', {
                        invalidArgs: errors,
                        myError: "error_test"
                    });
                    error.code = 404;
                    reject(error);
                } else
                    resolve(cars);
            }
        });
    });
};




module.exports = {
    getCars,
    filteredModels,
    filteredBrands
>>>>>>> f8b1c5fcaba93d0e45e6b067b560004a5abc578d
}