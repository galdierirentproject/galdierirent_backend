const user = `

        type Sede {
            indirizzo: String
            cap: String
            provincia:String
            comune:String
        }
        input Sede_input {
            indirizzo: String
            cap: String
            provincia:String
            comune:String
        }
        input Utente_input {
            _id : ID
            sha512 : String
            img :  [String]
            nome : String
            cognome : String
            username : String
            password : String
            email : String
            state : String
            ruolo : String
            profile_img : String
            room : String
            telefono : String
            cellulare : String
            titolo : String
            azienda : String
            indirizzo : String
            cap : String
            provincia : String
            comune : String
            cf : String
            piva : String
            token: String
            fuseconfig : Fuseconfig_input
            sede : Sede_input
            sede_point : Sede_input
            data : Date
            regionesociale : String
            tipologiacliente : String
            inizioattivita : Boolean
            consulente : Utente_input
            areamanager : Utente_input
            nome_point : String
        }
        type Utente {
            _id : ID
            sha512 : String
            img :  [String]
            nome : String
            cognome : String
            username : String
            password : String
            email : String
            state : String
            ruolo : String
            profile_img : String
            room : String
            telefono : String
            cellulare : String
            titolo : String
            azienda : String
            indirizzo : String
            cap : String
            provincia : String
            comune : String
            cf : String
            piva : String
            token: String
            fuseconfig : Fuseconfig
            sede : Sede
            sede_point : Sede
            data : Date
            regionesociale : String
            tipologiacliente : String
            inizioattivita : Boolean
            consulente : Utente
            areamanager : Utente
            nome_point : String
        }
        type vista_paginatore_utente{
            utenti:[Utente]
            n_utenti:Int
        }


        type Query {
            authenticate_graphql(user:Utente_input!):Utente
            ricerca_utente_id(id:ID):Utente
            ricerca_point:[Utente]
            autocompletamento_cliente(username:String,filtro:String,ruolo:String):[Utente]            
            autocompletamento_areamanager(filtro:String):[Utente]
        }
        type Mutation{
            crea_utente(user:Utente_input):Message
            elimina_utente(id:ID!):Message
            modifica_utente(user:Utente_input):String
            paginatore_clienti(skip:Int,limit:Int,filterValue:String,selection_key:String,utente:Utente_input):vista_paginatore_utente
            paginatore_utenti(skip:Int,limit:Int,filterValue:String,selection_key:String):vista_paginatore_utente
            generateshaForallDB:[Utente]
        }


        
    `;

module.exports = { user };