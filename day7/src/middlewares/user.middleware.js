const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

let authMiddleware = async (req, res, next) => {
    try {
        // get token from cookie
        let token = req.cookies.token;
        if(!token)
        return res.status(404).json({
            message:"token not found"
        })

        // decode token and verify
        let decode = jwt.verify(token, process.env.JWT_SECRET)
        if(!decode)
        return res.status(401).json({
            message:"unauthorized user"
        })

        // find user in database
        let user = await UserModel.findById(decode.id)
        if(!user)
        return res.status(401).json({
            message:"unauthorized user"
        })

        // set user in request object for further use in controllers
        req.user = user;

        // call next middleware or controller
        next();
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Error in middleware",
            error
        })
    }

}

module.exports = authMiddleware;