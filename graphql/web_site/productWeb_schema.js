/**
 * 
 * @author Mariangela Di Luccia
 * 
 */

const productWeb =
    `
    scalar Date

    type ProductWeb {
        _id:ID
        gruppo: String
        infocar: String
        marca: String
        modello: String
        allestimento: String
        optionals: [String]
        alimentazione: String
        rata: Float
        anticipo: Float
        durata: Int
        chilometri: Int
        foto: String
        foto_principale: String
        foto_dettaglio: String
        data: Date
        n_ordine: Int
        marchio: String
        servizi_inclusi: [String]
        a_partire_da: Float
        tipologia: String
        prezzo_listino: Float
        commissione: Float
        optional4r: String
        veicolo4r: String
        blocca_personalizzazione: Boolean
    }
    input ProductWeb_input {
        _id:ID
        gruppo: String
        infocar: String
        marca: String
        modello: String
        allestimento: String
        optionals: [String]
        alimentazione: String
        rata: Float
        anticipo: Float
        durata: Int
        chilometri: Int
        foto: String
        foto_principale: String
        foto_dettaglio: String
        data: Date
        n_ordine: Int
        marchio: String
        servizi_inclusi: [String]
        a_partire_da: Float
        tipologia: String
        prezzo_listino: Float
        commissione: Float
        optional4r: String
        veicolo4r: String
        blocca_personalizzazione: Boolean
    }
    type Query{
        getProductWebs:[ProductWeb]
        getProductWebById(_id:ID!):ProductWeb
    }
    type Mutation{
        mutationProductWeb(productWeb:ProductWeb_input):ProductWeb
    }
    `;

module.exports = { productWeb };