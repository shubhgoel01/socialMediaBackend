import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

const connectDB = async () => {
    try{
        console.log("Mongo URI →", process.env.MONGODB_URI);
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST ${connectionInstance.connection.host}`)
    }
    catch (error) {
        console.log("MONGODB connection error ", error)
        process.exit(1)
    }
}

export default connectDB

/*
    In the database connection file, we are connecting to MongoDB using mongoose.connect(). This is an asynchronous operation, 
    meaning it returns a Promise.

    We define an async function called connectDB, which internally uses await to wait for the database connection to succeed. 
    If it succeeds, we log a message. If it fails, we catch the error and call process.exit(1) to terminate the app.
*/