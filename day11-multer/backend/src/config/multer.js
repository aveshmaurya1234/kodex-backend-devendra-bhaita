const multer = require("multer");

// // for disk storage to save file in local storage

// let storage = multer.diskStorage({  
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/')
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname)
//     }
// });



// for memory storage use when you want to send file to cloud storage like imagekit, cloudinary etc
// it will save file in buffer format in memory and we can access it using req.file.buffer
// it does not save file in local storage but directly send it to cloud storage

let storage = multer.memoryStorage() 

let upload = multer({ storage: storage });

module.exports = upload;