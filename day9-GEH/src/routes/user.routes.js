let express = require('express');
const { registerController } = require('../controllers/user.controller');

let router = express.Router()

router.post("/register", registerController  )

module.exports = router;

