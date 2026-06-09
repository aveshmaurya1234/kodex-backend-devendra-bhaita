let express = require('express')
const { registerController, loginController } = require('../controllers/user.controllers')

let router = express.Router()

router.get('/', (req, res) => {
    return res.send("ok")

})

router.post("/register", registerController )
router.post("/login", loginController )

module.exports = router;
