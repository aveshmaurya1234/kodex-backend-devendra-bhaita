let { fileUploadService, multipleUploadService } = require("../services/fileUpload.service")

let imageUploadController = async (req, res) => {
    try {
        let file = req.file
        let result = await fileUploadService(file)

        return res.status(200).json({
            message : "file uploaded successfully",
            data : result
        })
    }
    catch (err) {
        console.log("error in controller", err)
        throw new Error("Internal Server Error")
    }   
}


let multipleUploadController = async (req, res) => {
    try {
        let files = req.files
        let result = await multipleUploadService(files)

        return res.status(201).json({
            message : "files uploaded successfully",
            data : result
        })
    }
    catch (err) {
        console.log("error in controller", err)
        throw new Error("Internal Server Error")
    }   
}

module.exports = {
    imageUploadController,
    multipleUploadController
}

