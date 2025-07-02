/* 
    require('dotenv').config({path: './env'}) 
    => The above statement will throw error if using type:module if package.json
    import dotenv from "dotenv"
    dotenv.config({
        path: './.env'
    })
*/

import dotenv from "dotenv"
// dotenv.config({
//         path: './.env'
//     })   
// I am getting undefined when using above code, so updating as below
dotenv.config()

import connectDB from "./db/index.js"; 
import { app } from "./app.js";

connectDB()
    .then( () => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running ar ${process.env.PORT}`)
        }).on("error", (error) => {
            console.log("Server failed to run...", error)
        }) 
    } )
    .catch((err) => {
        console.log("MongoDb connection failed", err)
    })

/*
    In our index.js file, we call the connectDB() function, which returns a Promise (because it's an async function). Since it's a Promise, 
    we use:

        .then() → to handle the case when the Promise resolves successfully, i.e., the database is connected.

        .catch() → to handle the case when the Promise rejects, i.e., the connection fails.

    Inside .then(), we start the Express server using app.listen(...), and attach a listener to the server’s "error" event to catch any runtime 
    issues during startup.

    app.listen() returns an instance of http.Server which emits events like
        1. listening
        2. error
        3. close
        4. connection (for tcp connections)

*/

/*
import express from "express"

const app = express()

;( async ()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) => {           
            console.log("ERROR", error)
            throw error
        })

        //There can be possibility that dataBase is connected but our app(express) is not able to connect, so we have a error listener
        // app.on("error") => error stands for error listener, and a callback function, what to do when error occurs
        //We say it as - registering an event listener for the error event on an app object.

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`)
        })

        //This tells your app to start listening for incoming HTTP requests. It's like saying: "Turn on the server!"
    }
    catch (error){
        console.error("ERROR", error)
        throw error
    }
} )()

*/