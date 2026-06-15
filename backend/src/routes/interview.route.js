import express from 'express'
import { authUser } from '../middlewares/auth.middleware.js'
import { upload } from "../middlewares/file.middleware.js"
import { generateInterviewReportByIdController, generateInterviewReportController, generateResumePdfController, getAllInterviewReportsController } from '../controllers/interview.controller.js'
const route = express.Router()

route.post("/",authUser, upload.single("resume"), generateInterviewReportController)
route.get("/report/:interviewId",authUser, generateInterviewReportByIdController)
route.get("/",authUser, getAllInterviewReportsController)
route.post("/resume/pdf/:interviewReportId", authUser, generateResumePdfController)


export default route