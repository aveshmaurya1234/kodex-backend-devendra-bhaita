const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: Number,
    password: String,
},{
    timestamps: true
})

let UserModel = mongoose.model('user', userSchema);
module.exports = UserModel