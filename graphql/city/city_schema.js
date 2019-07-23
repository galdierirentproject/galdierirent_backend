const city = `

        type Comuni {
            nome:String
        }
        type City {
            nome:String
            comuni: [Comuni]
        }

        type Query {
            getCitys: [City]
            filteredCity(filtro:String):[City]

        }

    `;
module.exports = { city };


// import user from '../user/user_schema';
// const { gql } = require('apollo-server-express');
// const _city = `

//         type Comuni {
//             nome:String
//         }
//         type City {
//             nome:String
//             comuni: [Comuni]
//         }

//         extend type Query {
//             getCitys: [City]
//             filteredCity(filtro:String):[City]

//         }

//     `;
// const typeDefAndUser = _city + user.user;
// const city = gql `${typeDefAndUser}`;
// module.exports = { city };