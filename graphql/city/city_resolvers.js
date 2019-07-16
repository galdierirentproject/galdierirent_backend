var city_controller = require('../../controllers/city_controller');
const { UserInputError } = require('apollo-server-express');
var jwt = require('jsonwebtoken');

const resolver_city = {

    Query: {
        filteredCity: async(parent, args, context) => {
            const result = await city_controller.filteredCity(args);
            return result;
        },
        getCitys: async(parent, args, context) => {
            const result = await city_controller.getCitys_graphql(args);
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
                    const result = await city_controller.getCitys_graphql(args);
                    return result;
                }
            });

        }
    }
};
module.exports = { resolver_city };