import {PDFParse}from "pdf-parse"
import {generateInterviewReport} from "../services/ai.service.js"
import InterviewReport from "../models/interviewReport.model.js"
const generateInterviewReportController= async (req, res)=>{
    try {
        const resumeContent = await (new PDFParse(Uint8Array.from(req.file.buffer))).getText()
        const { selfDescription, jobDescription} =req.body

        const interviewReportByAi= await generateInterviewReport({
            resume:resumeContent,
            selfDescription,
            jobDescription
        })

        const interviewReport = await InterviewReport.create({
            user:req.user.id,
            resume:resumeContent.text,
            selfDescription,
            jobDescription,
            ...interviewReportByAi
        })
        res.status(201).json({
            message:"Inteview report generated successfully",
            interviewReport
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            message:"Error in interview build report",
            error
        })
    }
}

export { generateInterviewReportController }