import mongoose from "mongoose";
import { sendMail } from "../utils/sendMail.js";
import otpTemplate from "../mail/template/emailVerificationTemplate.js"

export const otpSchema = new mongoose.Schema({
email:{
    type:String,
    required:true
},
otp:{
    type:String,
    required:true
},
createdAt:{
    type:Date,
    default:Date.now,
    expires:5*60
}
})

async function sendVerificationMail(email,otp) {
    try {
        const otpHtml = otpTemplate(otp)
        const mailResponse = await sendMail(email,"Verifcation Email From StudyNotion",otpHtml);
        ("Email Send Succesfully",mailResponse)
    } catch (err) {
        ("Error While Sending The Verifcation Mail",err.message)
        throw err;
    }
}

otpSchema.pre("save",async function (next) {
    await sendVerificationMail(this.email,this.otp);
    next()
})

export const Otp = mongoose.model("Otp",otpSchema)