let mongoose = require("mongoose")

let filesSchema = new mongoose.Schema({
    images: [{
        type: String,
        required: true
    }],
    name: String,
}, {timestamps: true})

let FileModel = mongoose.model("files", filesSchema)

module.exports = FileModel;