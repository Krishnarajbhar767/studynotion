// sign in Controller
// is Admin Controller
// Is Student Controller
// Is instructur Controller
import { User } from "../models/User.model.js";
import { Otp } from "../models/Otpmodel.js";
import otpGenerator from "otp-generator";
import { Profile } from "../models/Profile.model.js"; 
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { configDotenv } from "dotenv";
import { sendMail } from "../utils/sendMail.js";
configDotenv()
export const signUp = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      otp,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !accountType 
    ) {
      return res.status(400).json({
        success: false,
        message: "Please Fill All The Data Carefully",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password Do Not Match",
      });
    }
    // if user Laready exist then return
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(500).json({
        success: false,
        message: "User Already Exist",
      });
    }

    //  find thee most recent otp
    const recentOtp = await Otp.findOne({ email }).sort({createdAt:-1}).limit(1) // need to undertand this

    // Validate the otp
    

    if (!recentOtp) {
      return res.status(400).json({
        success: false,
        message: "Otp Not Found",
      });
    } else if (recentOtp.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid Otp",
      });
    }

    let hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashed Password",hashedPassword);
    //  If evrything is fine then Succesfully Save The Data In Database
    const profileDetails = await Profile.create({
      gender: null,
      dob: null,
      about: null,
      contactNumber: null,
    });
    const user =await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType,
      additionalDetails: profileDetails._id,
      avtar: `https://api.dicebear.com/9.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    return res.status(200).json({
      success: true,
      message: "Sign Up Data Captured Successfully",
      data:user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Send Otp Controller
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    // check if User Already Exits in Database

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      console.log("User Already Exist")
      return res.status(401).json({
        success: false,
        message: "User Already Exist",
      });
    }

    let OTP = await otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // check uniqe otp or not
    let result = await Otp.findOne({ otp: OTP });

    while (result) {
      OTP = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await Otp.findOne({ otp: OTP });
    }

    const otpPayload = { email, otp:OTP };

    // create an entry in db
    const savedOTP = Otp.create(otpPayload);
    // console.log(savedOTP);

    return res.status(200).json({
      success: true,
      message: "OTP SEND SUCCESSFULLY",
      otp: OTP,
    });
  } catch (error) {
    // console.log(error)
    return res.status(500).json({
      success: false,
      error: error,
      message: "Error While Sending Otp",
    });
  }
};


// Login Controller

export const login = async (req,res)=>{
try {
    const {email,password} = req.body;
    // validate The data
    if (!email || !password ) {
        return res.status(401).json({
            succes:false,
            message:"Please Enter All Requred Data."
        })
    }

    // check is User Is Exist 
    const user = await User.findOne({email}).populate("additionalDetails").exec();

    if (!user) {
        return res.status(401).json({
            success:false,
            message:"User Is Not regster plase signup first."
        })
    }
    // genaret JWT Token,After Password Matched
    const payload = {
        email:user.email,
        id:user._id,
        accountType:user.accountType 
    }
    // console.log("Printing My All Password",password,user.password)
    const validPassword = await bcrypt.compare(password , user.password);
    // console.log("is Password Valid",validPassword)
    if   (validPassword) {
        const token = jwt.sign(payload,process.env.SECRET_KEY,{
            expiresIn:"1h"
        })
        // console.log("Generated Token",token)
        user.token = token;
        user.password = null;
         // create Cookies and send response
         const option = {
            expires:new Date(Date.now()+3*24*60*60*1000),
            httpOnly:true
         }
        req.body.token = token;
        return res.cookie("token",token,option).status(200).json({
            succes:true,
            token,
            user,
            message:"Logged IN SuccessFully"
         })
    }else{
        return res.status(400).json({
            success:false,
            message:"password is incorecct"
        })
    }

} catch (error) {
    // console.log( "got From Login",error);
    return res.status(500).json({
        success:false,
        message:"lOGIN Failure Please try again"
    })
}
}


// change password

export const changePassword = async (req,res)=>{
    // get data from req
    try {
      const {email,oldPassword,newPassword,confirmPassword} = req.body;
      const loginUser = req.user;
      console.log("Printing The User Data",loginUser)
    if (!email || !oldPassword ||! confirmPassword ||!newPassword) {
      return res.status(401).json({
        success:false,
        message:"Please Enter All Required Data.",
      })
    }
    // validation
    const user = await User.findOne({loginUser});
    if (!user) {
      return res.status(400).json({
        success:false,
        message:"User Dose Not Exist",
      })
    }
    
    if (bcrypt.compare(user.password,oldPassword)) {
      return res.status(401).json({
        success:false,
        message:"Old Password Do Not Match."
      })
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        succes:false,
        message:"New Password And Confirm Password Do Not Match"
      })
    }
    // if validation pass upadate Data
    const hashedPassword = bcrypt.hash(newPassword,10);
    user.password = hashedPassword;

    const updatedUser = await User.findOneAndUpdate({email},{password:hashedPassword},{new:true});
    // send email
    sendMail(email,"Password Changed","your Password Changed Succesfully");

    // retun response
    return res.status(200).json({
      success:true,
      message:"Password Chnaged Successfully...",
      user:updatedUser,
    })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        success:false,
        message:`Something went Wrong While Changing The password : ${error.message}`,
      })
    }
}