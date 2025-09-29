import mongoose from "mongoose";
import {DB_NAME} from "../constants.js";



const connectDB = async () => {
    try {
        const mongoUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017';
        const connectionString = `${mongoUrl}/${DB_NAME}`;
        console.log('Connecting to MongoDB:', connectionString);
        const response = await mongoose.connect(connectionString);
        console.log("MongoDB Connected...");
        return response;
    } catch (error) {
        console.error("Error connecting to MongoDB\n\n", error);
        process.exit(1);
    }
};

export default connectDB;