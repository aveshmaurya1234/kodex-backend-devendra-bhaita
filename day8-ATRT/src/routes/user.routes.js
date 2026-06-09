let express = require('express');
const { registerController, loginController, getRefreshTokenController } = require('../controllers/user.controller');

let router = express.Router()

router.get('/getRefreshToken', getRefreshTokenController )

router.post("/register", registerController  )
router.post("/login", loginController  )

module.exports = router;

