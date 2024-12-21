import { User } from "../models/User.model.js";
import { sendMail } from "../utils/sendMail.js";
import bcrypt from "bcryptjs";
export const resetPasswordToken =async (req, res)=>{
try {
    const {email} = req.body;
    if (!email) {
        return res.status(400).json({
            success:false,
            message:"Please enter Email",
        })
    }
    const user = await User.findOne({email});

    if (!user) {
        return res.status(401).json({
            success:false,
            message:"User Dose Not Exit. Please Sign Up First"
        })
    }

    const resetToken = crypto.randomUUID();
    const updatedUser = await User.findOneAndUpdate({email:email}, {resetToken:resetToken,resetTokenExpire:Date.now() + 5*60*100}, {new :true})
    
    await sendMail(email,"Reset Password Link From StudyNotion",`http://localhost:4000/update-password/${resetToken}`);

    return res.status(200).json({
        success:true,
        message:"Reset Password Link Send Successfully."
    })
} catch (error) {
    console.log(error)
    return res.status(500).json({
        success:false,
        message:"Error While Reseting Password Please try Again !"
    })
}

}

export const  resetPassword  = async(req,res)=>{
try {
    
    const {resetToken, password,confirmPassword} = req.body; 


if (!password || !confirmPassword) {
    return res.status(401).json({
        success:false,
        message:"Please Fill All Required Data."
    })
}

if (password !== confirmPassword) {
    return res.status(400).json({
    success:false,
    message:"Password Do Not Match"
    })
};
const user = await User.findOne({resetToken});
if (!user) {
    return res.status(401).json({
        success:false,
        message:"invalid Token ! Or Session"
    })
}

if (user.resetToken > Date.now()) {
    return res.status(401).json({
        success:false,
        message:"Your Session Has Expired Please Generate New Link"
    })
}

const samePassword = await bcrypt.compare(password,user.password );
if(samePassword) return res.status(402).json({
    success:false,
    message:"Sorry ! This Is Current Password"
})

const hashedPassword = await bcrypt.hash(password,10);

const updatedUser = await User.findOneAndUpdate({resetToken:resetToken}, {
    password:hashedPassword,
    resetToken:"",
},{new :true});

return res.status(200).json({
    success:true,
    message:"Password Reset Successfull."
})
} catch (error) {
    ("Got Error While Reseting The Password",error);
    return res.status(500).json({
        success:false,
        message:"Error While Reseting the Password Please Try Again !",
    })
}
}