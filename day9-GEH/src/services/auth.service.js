const UserModel = require("../models/user.model");
const ApiError = require("../utils/apiError");

let registerService = async (userData) => {
    let {name, email, password} = userData;

    if(!name || !email || !password) throw new ApiError(404, "All fields are required")  

    let isExisted = await UserModel.findOne({email})
    if(isExisted) throw new ApiError(409, "This email already exist")

    let newUser = await UserModel.create({
        name, email, password
    })
    return newUser;
}

module.exports = {
    registerService,
}