var car_controller = require('../../controllers/cars_controller');

const resolver_car = {

    Query: {
        getCars: async(parent, args, context) => {
            const result = await car_controller.getCars();
            return result;
        },
        filteredModels: async(parent, args, context) => {
            const result = await car_controller.filteredModels(args);
            return result;
        },
        filteredBrands: async(parent, args, context) => {
            const result = await car_controller.filteredBrands(args);
            return result;
        }

    }
};
module.exports = { resolver_car };