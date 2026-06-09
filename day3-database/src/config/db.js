const mongoose = require("mongoose")

let connectDB = async () => {
    try{
        // await mongoose.connect('mongodb://127.0.0.0:27017/mydb') 
        // await mongoose.connect('mongodb://127.0.0.1:27017/mydb1')
        // await mongoose.connect('mongodb://localhost:27017/mydb2')
        // await mongoose.connect('mongodb://0.0.0.0/mydb3')
        await mongoose.connect('mongodb+srv://kodex:kodex0000@cluster1.cgaag6t.mongodb.net/kodex')
        console.log("mongodb connected")
    }catch(error){
        console.log("error in connecting DB", error)
    }
}

module.exports = connectDB;