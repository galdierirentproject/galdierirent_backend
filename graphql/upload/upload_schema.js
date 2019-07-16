const upload =
    `

scalar Upload
scalar Date

type FileUpload {
    name: String
    size: Int
    type: String
    lastModified:Date
    lastModifiedDate:Date
    webkitRelativePath:String
  }

  type Query {
    uploads: [FileUpload]
  }

  type Mutation {
    carica_file(file: Upload,_id:String): String
    carica_img_profilo(file: Upload,_id:String): String

  }

`;
module.exports = { upload };