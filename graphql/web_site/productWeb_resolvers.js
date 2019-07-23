var productWeb_controller = require('../../controllers/productWeb_controller');
const { UserInputError } = require('apollo-server-express');
var jwt = require('jsonwebtoken');

const resolver_productWeb = {
    Query: {
        getProductWebById: async(parent, args, context) => {
            const result = await productWeb_controller.getProductWebById(args);
            return result;
            return jwt.verify(context.result, process.env.JWT_SECRET, async(err, decode) => {
                if (err) {
                    const error = new UserInputError('token expired!!!', {
                        invalidArgs: context,
                        myError: "token expired or invalid"
                    });
                    error.code = 401;
                    return error;
                } else {
                    const result = await productWeb_controller.getProductWebById(args);
                    return result;
                }
            });
        },
        getProductWebs: async(parent, args, context) => {
            const result = await productWeb_controller.getProductWebs(args);
            return result;
            return jwt.verify(context.result, process.env.JWT_SECRET, async(err, decode) => {
                if (err) {
                    const error = new UserInputError('token expired!!!', {
                        invalidArgs: context,
                        myError: "token expired or invalid"
                    });
                    error.code = 401;
                    return error;
                } else {
                    const result = await productWeb_controller.getProductWebs(args);
                    return result;
                }
            });
        }
    },
    Mutation: {
        mutationProductWeb: async(parent, args, context) => {
            const result = await productWeb_controller.mutationProductWeb(args);
            return result;
            return jwt.verify(context.result, process.env.JWT_SECRET, async(err, decode) => {
                if (err) {
                    const error = new UserInputError('token expired!!!', {
                        invalidArgs: context,
                        myError: "token expired or invalid"
                    });
                    error.code = 401;
                    return error;
                } else {
                    const result = await productWeb_controller.mutationProductWeb(args);
                    return result;
                }
            });
        }

    }
};
module.exports = { resolver_productWeb };