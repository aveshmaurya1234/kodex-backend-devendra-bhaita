let express = require('express');
const upload = require('../config/multer');
const sendFiles = require('../config/imagekit');
const { imageUploadController, multipleUploadController } = require('../controller.js/file.controller');

let router = express.Router()

// *** disk storage ***

// //  ***  for single file ***
// router.post("/upload-files", upload.single('image'), (req, res) => {
//     return res.send(req.file)
// })

// // *** for multiple files ***
// router.post("/upload-files", upload.array('images', 4), (req, res) => {
//     return res.send(req.files)
// })


// *** memory storage ***

// // *** for single file with cloud storage ***
// router.post("/upload-files", upload.single('image'), async (req, res) => {
//     let uploadedFile = await sendFiles(req.file.buffer, req.file.originalname)
//     return res.send(uploadedFile)
//     console.log(uploadedFile)
// })


// // // *** for multiple file with cloud storage ***
// router.post("/upload-files", upload.array('images', 4), async (req, res) => {

//     let files = req.files
//     // let uploadedFiles = files.map(async (file) => {
//     //     return await sendFiles(file.buffer, file.originalname)
//     // })
//     // let result = await Promise.all(uploadedFiles)
//     // return res.send(result)

//     let uploadedFiles = await Promise.all(files.map(async (file) => {
//         return await sendFiles(file.buffer, file.originalname)
//     }) )
//     return res.send(uploadedFiles)

//     let onelyUrls = uploadedFiles.map(file => file.url)
//     console.log("only urls", onelyUrls)

// } )


// *** for single file with cloud storage using controller ***
router.post("/image-upload", upload.single('image'), imageUploadController)

// *** for multiple file with cloud storage using controller ***
router.post("/multiple-upload", upload.array('images', 4), multipleUploadController)


module.exports = router;