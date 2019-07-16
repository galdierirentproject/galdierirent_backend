/**
 * This scheme defines the data types used for graphql
 * @author Mariangela Di Luccia
 * 
 */

import user from '../user/user_schema';
import type from '../type/type_schema';

const { gql } = require('apollo-server-express');

const _pratice =
    `
    type Pratica{
        _id:ID
        alimentazione:String
        allestimento:String
        anticipo: Float
        auto_sostitutiva: Boolean
        auto_sostitutiva_gruppo:String
        casa_locatrice:String
        casa_locatrice_preferenza:String
        chilometri: Int
        cliente:Utente
        codice_costruttore:String
        codice_marca:String
        codice_modello:String
        colore_esterno:String
        colore_interno:String
        durata: Int
        file:File
        forma_anticipo:String
        franchigia_furto: Float
        franchigia_kasko: Float
        franchigia_rca: Float
        fuel_card: Boolean
        infocar:String
        luogo_consegna:String
        marca:String
        modello:String
        nota:String
        optional:[String]
        pneumatici_estivi_metodo:String
        pneumatici_estivi_numero: Float
        pneumatici_estivi_performance:String
        pneumatici_invernali_metodo:String
        pneumatici_invernali_performance:String
        pneumatici_invernali_numero: Float
        prodotto:String
        provvigioni: Float
        provvigioni_definitive: Float
        provvigioni_percentuale: Float
        provvigioni_richieste: Float
        sostituzione_pneumatici: Boolean
        data:Date
        stato:[Stato]
        consulente:Utente
    }
    input Pratica_input{
        _id:ID
        alimentazione:String
        allestimento:String
        anticipo: Float
        auto_sostitutiva: Boolean
        auto_sostitutiva_gruppo:String
        casa_locatrice:String
        casa_locatrice_preferenza:String
        chilometri: Int
        cliente:Utente_input
        codice_costruttore:String
        codice_marca:String
        codice_modello:String
        colore_esterno:String
        colore_interno:String
        durata: Int
        file:File_input
        forma_anticipo:String
        franchigia_furto: Float
        franchigia_kasko: Float
        franchigia_rca: Float
        fuel_card: Boolean
        infocar:String
        luogo_consegna:String
        marca:String
        modello:String
        nota:String
        note_allegati:String
        note_preventivo:String
        optional:[String]
        pneumatici_estivi_metodo:String
        pneumatici_estivi_numero: Float
        pneumatici_estivi_performance:String
        pneumatici_invernali_metodo:String
        pneumatici_invernali_performance:String
        pneumatici_invernali_numero: Float
        prodotto:String
        provvigioni: Float
        provvigioni_definitive: Float
        provvigioni_percentuale: Float
        provvigioni_richieste: Float
        sostituzione_pneumatici: Boolean
        stato:[Stato_input]
        consulente:Utente_input
        data:Date
    }
    
    type File {
        _id:ID
        nome : String
        descrizione : String
        dimensione : Int
        tipo: String
        data:Date
    }

    input File_input {
        _id:ID
        nome : String
        descrizione : String
        dimensione : Int
        tipo: String
        data:Date
    }

    type Stato {
        nome: String
        numero: Int
        azioni: [Azione]
    }

    input Stato_input  {
        nome: String
        numero: Int
        azioni: [Azione_input]
    }

    type Azione  {
        _id:ID
        descrizione: String
        nota: String
        utente: Utente
        file:[File]
        data:Date
    }

    input Azione_input  {
        _id:ID
        descrizione: String
        nota: String
        utente: Utente_input
        file:[File_input]
        data:Date
    }
    type outputJump{
        pratices:[view_richieste_inviate]
        n_pratices:Int
    }

    type outputJump_ricevute{
        pratices:[view_richieste_ricevute]
        n_pratices:Int
    }

    type view_richieste_inviate {
        _id:ID
        utente : String
        piva : String
        veicolo : String
        durata:String
        chilometri:String
        data:Date
        consegna:String
        stato:String
        tipologia_prodotto:String
        commissioni:String
        commmissioni_finali:String
        cliente:String
    }   

    type view_richieste_ricevute {
        _id:ID
        cliente : String
        piva : String
        veicolo : String
        durata:String
        km:String
        sconto:String
        stato:String
        commissioni:String
        utente:String
        data:Date
    }

    extend type Query{
        getState0_jump(skip:Int,limit:Int,user_seller_id:ID):[Pratica]
        paginatore_richieste_inviate_stato(skip:Int,limit:Int,username:String,stato:String):outputJump
        paginatore_richieste_ricevute_stato(skip:Int,limit:Int,stato:String):outputJump
        filtro_ricerca_stato(filterValue:String,selection_key:String,stato:String):[view_richieste_inviate]
        ricerca_pratica_stato(id:ID,stato:String):Pratica

    }
     extend type Mutation{
        creazione_spostamento_pratica(stato:Stato_input,pratica:Pratica_input):Pratica
        elimina_pratica_stato(id:ID!,stato:String):Message
        elimina_file(file:File_input,id_pratica:ID!,stato:String):Message
    }
    `;

const typeDefAndUser = _pratice + user.user + type.type;
const pratice = gql `${typeDefAndUser}`;
module.exports = { pratice };