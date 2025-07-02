import express from "express"
import { errorController } from "../controllers/error.controller.js"

const errorRoute = express.Router()

errorRoute.route("/error").get(errorController)

export {errorRoute}