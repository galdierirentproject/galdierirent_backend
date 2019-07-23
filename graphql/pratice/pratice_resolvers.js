<<<<<<< HEAD
/**
 * This class receives the requests and delegates the task to the appropriate controller
 * @author Mariangela Di Luccia
 * The 0 indicates the initial status, in the future all these methods will take as input parameter the name of the state in which the practice is located
 */

var pratice_controller = require('../../controllers/pratices_controller');
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

const resolver_pratice = {
    //Graphql scalar type
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        getdate() {
            return new Date();
        },
        parseValue(value) {
            return new Date(value);
        },
        serialize(value) {
            return value.getTime();
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
                return new Date(ast.value)
            }
            return null;
        },
    }),
    Query: {
        /**
         * This method searches for a value in the DB by specifying a field to search
         * @param {String} filterValue value to be searched in the db
         * @param {String} selection_key key on which to search.
         * @returns {Pratices} Return the files containing the value specified as a key
         */
        filtro_ricerca_stato: async(parent, args) => {
            const result = await pratice_controller.filtro_ricerca_stato(args);
            return result;
        },
        /**
         * This method allows you to search for a practice in the db
         * @param {String} filterValue value to be searched in the db
         * @param {String} selection_key key on which to search.
         * @returns {Pratice} selection_key key on which to search.
         */
        ricerca_pratica_stato: async(parent, args) => {
            const result = await pratice_controller.ricerca_pratica_stato(args);
            return result;
        },
        /**
         * Returns all files sent by a consultant based on his username
         * @param {Int} skip number of pages to be skipped
         * @param {Int} limit maximum number of files to be returned
         * @param {String} username seller's username
         * @returns {Pratices} Pratices found in db 
         * @returns {Pratices} Number of files found
         */
        paginatore_richieste_inviate_stato: async(parent, args) => {
            const result = await pratice_controller.paginatore_richieste_inviate_stato(args);
            console.log("result:", result);

            const num = await pratice_controller.numero_richieste_inviate_stato({ stato: args.stato, user_seller: args.username });
            return { pratices: result, n_pratices: num };
        },
        /**
         * Return all practices that reside in state 0
         * @param {Int} skip number of pages to be skipped
         * @param {Int} limit maximum number of files to be returned
         * @returns {Pratices} Pratices found in db 
         * @returns {Int} Number of files found
         */
        paginatore_richieste_ricevute_stato: async(parent, args) => {
            const result = await pratice_controller.paginatore_richieste_ricevute_stato(args);
            const num = await pratice_controller.numero_richieste_ricevute_stato(args.stato);
            if (!num || !result) {
                return { pratices: [], n_pratices: 0 };
            }
            return { pratices: result, n_pratices: num };
        },
        // getState0_jump: async(parent, args) => {
        //     const result = await pratice_controller.getState0_jump(args);
        //     return result;
        // },

    },
    Mutation: {
        /**
         * Creation and updating of a practice
         * @param {Stato} stato next state of practice
         * @param {Pratica} pratica new practice or updated practice
         * @returns {Pratices} Pratices found in db 
         * @returns {Int} Number of files found
         */
        creazione_spostamento_pratica: async(parent, args) => {
            const result = await pratice_controller.creazione_spostamento_pratica(args);
            if(result.message==='NEW'){
                await pratice_controller.crea_cartella_pratica(result.pratice);
            }
            return result.pratice;
        },
        /**
         * elimination of the practice from state 0
         * @param {ID} id id pratice
         * @returns {Message} indicates success or failure
         */
        elimina_pratica_stato: async(parent, args) => {
            const result = await pratice_controller.elimina_pratica_stato(args);
            return result;
        },
        /**
         * elimination file
         * @param {ID} id_pratice  identification pratice 
         * @param {File} file file to delete
         * @returns {Message} indicates success or failure
         */
        elimina_file: async(parent, args) => {
            const result = await pratice_controller.elimina_file(args);
            return result;
        },
    }
};
=======
/**
 * This class receives the requests and delegates the task to the appropriate controller
 * @author Mariangela Di Luccia
 * The 0 indicates the initial status, in the future all these methods will take as input parameter the name of the state in which the practice is located
 */

var pratice_controller = require('../../controllers/pratices_controller');
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

const resolver_pratice = {
    //Graphql scalar type
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        getdate() {
            return new Date();
        },
        parseValue(value) {
            return new Date(value);
        },
        serialize(value) {
            return value.getTime();
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
                return new Date(ast.value)
            }
            return null;
        },
    }),
    Query: {
        /**
         * This method searches for a value in the DB by specifying a field to search
         * @param {String} filterValue value to be searched in the db
         * @param {String} selection_key key on which to search.
         * @returns {Pratices} Return the files containing the value specified as a key
         */
        filtro_ricerca_stato: async(parent, args) => {
            const result = await pratice_controller.filtro_ricerca_stato(args);
            return result;
        },
        /**
         * This method allows you to search for a practice in the db
         * @param {String} filterValue value to be searched in the db
         * @param {String} selection_key key on which to search.
         * @returns {Pratice} selection_key key on which to search.
         */
        ricerca_pratica_stato: async(parent, args) => {
            const result = await pratice_controller.ricerca_pratica_stato(args);
            return result;
        },
        /**
         * Returns all files sent by a consultant based on his username
         * @param {Int} skip number of pages to be skipped
         * @param {Int} limit maximum number of files to be returned
         * @param {String} username seller's username
         * @returns {Pratices} Pratices found in db 
         * @returns {Pratices} Number of files found
         */
        paginatore_richieste_inviate_stato: async(parent, args) => {
            const result = await pratice_controller.paginatore_richieste_inviate_stato(args);
            console.log("result:", result);

            const num = await pratice_controller.numero_richieste_inviate_stato({ stato: args.stato, user_seller: args.username });
            return { pratices: result, n_pratices: num };
        },
        /**
         * Return all practices that reside in state 0
         * @param {Int} skip number of pages to be skipped
         * @param {Int} limit maximum number of files to be returned
         * @returns {Pratices} Pratices found in db 
         * @returns {Int} Number of files found
         */
        paginatore_richieste_ricevute_stato: async(parent, args) => {
            const result = await pratice_controller.paginatore_richieste_ricevute_stato(args);
            const num = await pratice_controller.numero_richieste_ricevute_stato(args.stato);
            if (!num || !result) {
                return { pratices: [], n_pratices: 0 };
            }
            return { pratices: result, n_pratices: num };
        },
        // getState0_jump: async(parent, args) => {
        //     const result = await pratice_controller.getState0_jump(args);
        //     return result;
        // },

    },
    Mutation: {
        /**
         * Creation and updating of a practice
         * @param {Stato} stato next state of practice
         * @param {Pratica} pratica new practice or updated practice
         * @returns {Pratices} Pratices found in db 
         * @returns {Int} Number of files found
         */
        creazione_spostamento_pratica: async(parent, args) => {
            const result = await pratice_controller.creazione_spostamento_pratica(args);
            return result;
        },
        /**
         * elimination of the practice from state 0
         * @param {ID} id id pratice
         * @returns {Message} indicates success or failure
         */
        elimina_pratica_stato: async(parent, args) => {
            const result = await pratice_controller.elimina_pratica_stato(args);
            return result;
        },
        /**
         * elimination file
         * @param {ID} id_pratice  identification pratice 
         * @param {File} file file to delete
         * @returns {Message} indicates success or failure
         */
        elimina_file: async(parent, args) => {
            const result = await pratice_controller.elimina_file(args);
            return result;
        },
    }
};
>>>>>>> f8b1c5fcaba93d0e45e6b067b560004a5abc578d
module.exports = { resolver_pratice };