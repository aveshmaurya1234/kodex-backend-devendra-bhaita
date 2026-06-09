let express = require('express')

const { 
    createListController, 
    getAllListsController, 
    updateListController,
    deleteListController
} = require('../controllers/list.controllers');

let router = express.Router()

router.post("/create", createListController);
router.get("/", getAllListsController);
router.put("/update/:id", updateListController);
router.delete("/delete/:id", deleteListController);

module.exports = router;
