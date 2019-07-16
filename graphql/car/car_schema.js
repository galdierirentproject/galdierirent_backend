const car =  `

        type Car {
            brand:String
            models: [String]
        }

        type Query {
            getCars:[Car]
            filteredModels(brand:String,filtro:String):[Car]
            filteredBrands(filtro:String):[Car]

        }

    `
;
module.exports = { car };
