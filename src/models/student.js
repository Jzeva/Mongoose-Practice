//firstName,lastName,email
const mongoose = require('mongoose');
const Joi = require('joi');
//Joi, express-validator, validator.js

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
        required:true,
        validate:{
            validator:(email) =>{
                /*const validate = Joi.string().email.validate(email);
                const {error} = validate;
                if(error){
                    return false;
                }

                return true; */
                return !Joi.string().email().validate(email).error;
            },
            msg:'Invalid email format',
        }
    }
})

const Model = mongoose.model('Student',schema);

module.exports = Model;