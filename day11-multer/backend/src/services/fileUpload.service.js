const sendFiles = require("../config/imagekit")
let FileModel = require("../models/file.model")

let fileUploadService = async (file) => {
    if(!file) throw new Error("file is required")
    
    let uploadedFile = await sendFiles(file.buffer, file.originalname)
    let newFile = {
        name : "tril1",
        images: uploadedFile.url
    }
    return newFile
}

let multipleUploadService = async (files) => {
    if(!files) throw new Error("files is required")
    
    let uploadedFiles = await Promise.all(files.map(async (file) => {
        return await sendFiles(file.buffer, file.originalname)
    }))

    let newFiles = await FileModel.create({ 
        name : "tril1",
        images: uploadedFiles.map(file => file.url)
    })
    return newFiles
} 


module.exports = {
    fileUploadService,
    multipleUploadService
}