/**
 * This controller merges all graphql schemas and resolvers
 * @author Mariangela Di Luccia
 * 
 */


import {
    makeExecutableSchema,
    mergeSchemas,
} from 'graphql-tools';

//upload
const schema_upload = require('./upload/upload_schema');
const resolver_upload = require('./upload/upload_resolvers');
const uploadSchema = makeExecutableSchema({ typeDefs: schema_upload.upload, resolvers: resolver_upload.resolver_upload });

//user
// const schema_user = require('./user/user_schema');
const resolver_user = require('./user/user_resolvers');
//the user scheme is already imported into the scheme of the practice

//pratice
const schema_pratice = require('./pratice/pratice_schema');
const resolver_pratice = require('./pratice/pratice_resolvers');
const praticeSchema = makeExecutableSchema({ typeDefs: schema_pratice.pratice, resolvers: [resolver_pratice.resolver_pratice, resolver_user.resolver_user] });
//citys
const schema_city = require('./city/city_schema');
const resolver_city = require('./city/city_resolvers');
const citySchema = makeExecutableSchema({ typeDefs: schema_city.city, resolvers: resolver_city.resolver_city });
//cars
const schema_car = require('./car/car_schema');
const resolver_car = require('./car/car_resolvers');
const carSchema = makeExecutableSchema({ typeDefs: schema_car.car, resolvers: resolver_car.resolver_car });

//productWeb
const schema_productWeb = require('./web_site/productWeb_schema');
const resolver_productWeb = require('./web_site/productWeb_resolvers');
const productWebSchema = makeExecutableSchema({ typeDefs: schema_productWeb.productWeb, resolvers: resolver_productWeb.resolver_productWeb });



const schema = mergeSchemas({
    schemas: [uploadSchema, citySchema, praticeSchema, carSchema, productWebSchema]
});
module.exports = { schema }