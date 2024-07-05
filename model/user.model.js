const mongoose=require('mongoose')
const { type } = require('os')

// new.mongoose.Schema({schemaDesign},{timeStamp:true/false})
const userSchema = new mongoose.Schema({
    username:{
        unique:true,
        required:true,
        type:String
    },
    email:{
        unique:true,
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    }
},{
    timestamps :true
})

// mongoose.model('collectionName',schemaName)

let User= mongoose.model('users',userSchema)

module.exports=User

