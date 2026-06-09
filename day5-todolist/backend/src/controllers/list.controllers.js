const ListModel = require("../models/list.model");

let createListController = async (req, res) => {
    try {
        let { name, description } = req.body;

        if (!name || !description)
        return res.status(400).json({
            message: "ALl fields are required",
        });

        let newList = await ListModel.create({
            taskName: name,
            description,
        });

        return res.status(201).json({
            message: "List created successfully",
            list: newList,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

let getAllListsController = async (req, res) => {
    try {
        let allList = await ListModel.find();
        if(!allList.length)
        return res.status(204).json({
            message: "List feched successfully",
            list: allList,
        });

        return res.status(200).json({
            message: "List feched successfully",
            list: allList,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

let updateListController = async (req, res) => {
    try {
        let {id} = req.params
        if(!id)
        return res.status(404).json({
            message: "id not found",
        });

        let { name, description } = req.body;

        if (!name || !description)
        return res.status(400).json({
            message: "ALl fields are required",
        });

        let updateList = await ListModel.findByIdAndUpdate(id,{
            taskName: name,
            description,
        }, {new: true});

        return res.status(200).json({
            message: "List updated successfully",
            list: updateList,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

let deleteListController = async (req, res) => {
    try {
        let {id} = req.params;
        if(!id)
        return res.status(404).json({
            message: "id not found",
        });

        let deleteList = await ListModel.findByIdAndDelete(id);

        return res.status(200).json({
            message: "List deleted successfully",
            list: deleteList,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

module.exports = {
    createListController,
    getAllListsController,
    updateListController,
    deleteListController,
}