import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.routes.js"
import { errorMiddleware } from "./middlewares/error.middleware.js"
import { errorRoute } from "./routes/errors.routes.js"
//Cookie parser allows us to access the cookies form the suer browser and send cookies - Basically perform CRUD operations on cookies

const app = express()

//Now we need to perform the configurations
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

//Now saying that i can accept json data and we can also set the limit
app.use(express.json({limit: "16kb"}))

//Now saying that i can accept data from the URL
app.use(express.urlencoded({extended: true, limit: "16kb"}))

//creating a confuguration for some assets like pdf, images
app.use(express.static("public"))

//Configire cookies
app.use(cookieParser())

app.use("/api/v1/users", userRouter)
app.use(errorRoute)

app.use(errorMiddleware)

export { app }