import mongoose from "mongoose";
import Todo from "../models/todo.models.js";
const connectedDB = async() => {
    try {    
       await mongoose.connect(process.env.MONGODB_URL);
        console.log("DB is connected");
        
    } catch (error) {
        console.log(error);
        
        console.log("MongoDB connection error");
        
    }
}



export default connectedDB;