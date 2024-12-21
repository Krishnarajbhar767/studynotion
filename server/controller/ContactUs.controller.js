import contactUsEmail from "../mail/template/contactFormRes.js";
import { sendMail } from "../utils/sendMail.js";

export const contactUs = async (req,res)=>{
        try {
                const {countrycode,firstname,email,lastname,message,phoneNo} = req.body;
                if (!countrycode || !firstname,!email || ! lastname || !message ||!phoneNo) {
                        return res.status(401).json({
                                success:false,
                                message:"Proprty Missing",
                        })
                };
                const htmlBody = contactUsEmail(email,firstname,lastname,message,phoneNo,countrycode);
                const mailResponseClient = await sendMail(email,`ED-Tech : ${firstname} ${lastname} Your Response Has Been Captured.`,htmlBody);
                const mailResponseAdmin = await sendMail("krishnarajbhar767@gmail.com",`ED-Tech : ${firstname} ${lastname} Send A Mail.`,`<div><h3>Message</h3> <p>${message}</p></div>`)
                return res.status(200).json({
                        success:true,
                        message:"Thank Your For Contacting Us."
                })
        } catch (error) {
                return res.status(400).json({
                        success:false,
                        message:"Failed to send mail. Please Try Again"
                })
        }
}