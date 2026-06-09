import mongoose from "mongoose";

let connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://kodex:kodex0000@cluster1.cgaag6t.mongodb.net/google-auth")
        console.log("connected to db")
    }   
    catch (err) {
        console.log(" error while connecting to db", err)
    }
}

export default connectDB;