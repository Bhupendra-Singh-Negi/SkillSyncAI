import {PDFParse}from "pdf-parse"
import {generateInterviewReport, generateResumePdf} from "../services/ai.service.js"
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

const generateInterviewReportByIdController= async(req,res)=>{
    try {
        
        const {interviewId} =req.params;
        const interviewReport = await InterviewReport.findOne({_id:interviewId, user:req.user.id})
        if(!interviewReport){
            return res.status(404).json({
                message:"Inteview report not found"
            })
        }
        res.status(200).json({
            message:"Interview report fetch successfully",
            interviewReport
        })
        } catch (error) {
            res.status(400).json({
                message:"Error in fetching interview report",
                error
            })
        }

}
const getAllInterviewReportsController =async(req,res)=>{
    try {
         const interviewReports = await InterviewReport.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    res.status(200).json({
        message: "Interview reports fetched successfully.",
        interviewReports
    })
    } catch (error) {
        res.status(400).json({
            message: "Error in fetching interview report",
        })
    }
}
async function generateResumePdfController(req, res) {
    const { interviewReportId } = req.params

    const interviewReport = await InterviewReport.findById(interviewReportId)

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    const { resume, jobDescription, selfDescription } = interviewReport

    const pdfBuffer = await generateResumePdf({ resume, jobDescription, selfDescription })

    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
    })

    res.send(pdfBuffer)
}
export { generateInterviewReportController,  generateInterviewReportByIdController, getAllInterviewReportsController, generateResumePdfController }