//firstName,lastName,email
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    
    _id:{
        type:String,
        alias:'studentNumber',
    },

    firstName:{
        type:String,
        required:true,
    },

    lastName:{
        type:String,
        required:true,
    },

    email:{
        type:String,
        default:'',
    }
})

const Model = mongoose.model('Student',schema);

module.exports = Model;