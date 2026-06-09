const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const { generateAccessToken, generateRefreshToken } = require("../utils/token");


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
        let accessToken = generateAccessToken(newUser._id)
        let refreshToken = generateRefreshToken(newUser._id)

        newUser.refreshToken = refreshToken;
        await newUser.save()

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            // secure: true,
            // sameSite: "strict",
            maxAge: 15 * 60 * 1000,
        }) 

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            // secure: true,
            // sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        }) 


        return res.status(201).json({
            message:"user creted successfully.",
            user:newUser,
        })

    } catch (error) {
        return res.status(500).json({
            error: error.message,
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

        // // compare password
        let isMatch = await isExisted.comparePassword(password)
        if(!isMatch){
            return res.status(401).json({
            message:"Invalid credentials"
        })
        }
        

        // create token and set in cookie
        let accessToken = generateAccessToken(isExisted._id)
        let refreshToken = generateRefreshToken(isExisted._id)

        isExisted.refreshToken = refreshToken;
        await isExisted.save()

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            // secure: true,
            // sameSite: "strict",
            maxAge: 15 * 60 * 1000,
        }) 

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            // secure: true,
            // sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        }) 

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

let getRefreshTokenController = async (req, res) => {
    try {
        // get RefreshToken from cookie
        let refreshToken = req.cookies.refreshToken;
        if(!refreshToken)
        return res.status(401).json({
            message:"Unauthorized user"
        })

        // decode RefreshToken and verify
        let decode = jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH)
        if(!decode)
        return res.status(401).json({
            message:"unauthorized user"
        })

        // find user in database
        let user = await UserModel.findById(decode.userId)
        if(!user)
        return res.status(401).json({
            message:"unauthorized user"
        })

        if(refreshToken !== user.refreshToken)
        return res.status(401).json({
            message:"unauthorized user"
        })

        // generate new access token and set in cookie
        let accessToken = generateAccessToken(user._id)

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000,
        })

        return res.status(200).json({
            message:"Access token generated successfully"
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
        })
    }
}

module.exports = {
    registerController,
    loginController,
    getRefreshTokenController
}