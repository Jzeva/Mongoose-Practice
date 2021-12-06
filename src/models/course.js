const mongoose = require('mongoose');

const  schema = new mongoose.Schema({
    //ObjectId
    _id:{
        type:String,
        uppercase:true,
        alias:'code',
    },
    name:{
        type:String,
        required:true,//validation
    },
    description: {
        default:'',
        type:String,
    }
})

//In MongoDB collections, it will be named as courses.
const Model  = mongoose.model('Course',schema);

module.exports = Model;