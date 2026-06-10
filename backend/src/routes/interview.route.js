import express from 'express'
import { authUser } from '../middlewares/auth.middleware.js'
import { upload } from "../middlewares/file.middleware.js"
import { generateInterviewReportController } from '../controllers/interview.controller.js'
const route = express.Router()

route.post("/",authUser, upload.single("resume"), generateInterviewReportController)

export default route