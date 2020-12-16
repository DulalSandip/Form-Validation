const mongoose = require('mongoose')
const Schema = mongoose.Schema

const registerSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    date_of_birth:{
        type:Date,
        required:true,
        trim:true,
    },
    phone:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    roles:{
        type:String,
        required:true,
        enum:['customer','admin','user','visitor'],

    }
})

const User = mongoose.model('user', registerSchema)
module.exports = User
