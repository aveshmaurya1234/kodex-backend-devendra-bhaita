const jwt = require("jsonwebtoken");
const cacheInstance = require("../config/caching");

const protect = async (req, res, next) => {
    try {
        const token = req.cookies.token

        if (!token ) {
            return res.status(401).json({
                message: "Token missing",
            });
        }

        let isBlackListed = await cacheInstance.get(token);
        if(isBlackListed){
            return res.status(401).json({
                message: "HTMKC",
            });
        }

        const decoded = jwt.verify( token, process.env.JWT_SECRET);

        if (!decoded ) {
            return res.status(401).json({
                message: "UnAuthorized user",
            });
        }

        req.user = decoded;

        next();
    } catch (error) {
        res.status(401).json({
        message: "Invalid token",
        });
    }
};

module.exports = protect;