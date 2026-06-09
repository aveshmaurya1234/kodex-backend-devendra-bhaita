const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    name:{
        type: String,
        trim:true
    },
    email:{
        type: String,
        required:[ true, "email is required"],
        trim:true
    },
    password:{
        type: String,
        required:[ true, "password is required"],
        trim:true
    },
    mobile:{
        type: String,
        minlength:10,
        maxlength:10,
        required:[ true, "mobile is required"],
        trim:true
    },
},{timestamps: true})

let UserModel = mongoose.model('user', userSchema)
module.exports = UserModel;