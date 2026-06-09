const UserModel = require("../models/user.model");

let registerController = async (req, res) => {
    try {
        let {name, email, password, mobile} = req.body;

        if(!email || !password)
        return res.status(400).json({
            message:"All fields are required"
        })

        let isExisted = await UserModel.findOne({email})
        if(isExisted)
        return res.status(409).json({
            message:"This email alredy exist"
        })

        // password hashing and token creation is done in model using mongoose middleware and method respectively

        let newUser = await UserModel.create({
            name, email, password, mobile
        })

        // create token and set in cookie
        let token = newUser.createToken()
        res.cookie("token", token)


        return res.status(201).json({
            message:"user creted successfully.",
            user:newUser,
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        })
    }
}

let loginController = async (req, res) => {
    try {
        let { email, password } = req.body;

        if(!email || !password)
        return res.status(400).json({
            message:"All fields are required"
        })

        let isExisted = await UserModel.findOne({email})
        if(!isExisted)
        return res.status(404).json({
            message:"User not found"
        })

        // compare password
        let isMatch = await isExisted.comparePassword(password)
        if(!isMatch)
        return res.status(401).json({
            message:"Invalid credentials"
        })

        let token = isExisted.createToken()
        res.cookie("token", token)

        return res.status(200).json({
            message:"user logged in successfully.",
            user:isExisted,
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        })
    }
}

module.exports = {
    registerController,
    loginController
}