let express = require('express');
const authMiddleware = require('../middlewares/user.middleware');

let router = express.Router()

router.get('/', authMiddleware, async (req, res) => {
    try {
        console.log(req.user)
        return res.send("ok mai home ke ander hu")
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
        })
    }
})

module.exports = router;