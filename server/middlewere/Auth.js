
import jwt from "jsonwebtoken"  
import bcrypt from "bcryptjs";
import { configDotenv } from "dotenv";
import { User } from "../models/User.model.js";
configDotenv()

// isAuthenticated

export const isAuthenticated = async (req,res,next)=>{
try {
    // extract token
    const token = req.cookies.token || req.body.token ;
    if (!token) {
        return res.status(400).json({
            success:false,
            message:"Token is Missing"
        })
    }

    // verify the token
    try {
        const decode = await jwt.verify(token,process.env.SECRET_KEY);// decoding the same login crediential from token cookies
        req.user = decode; // inserting login credential into reqeust body 
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"token is invalid"
        })
    }
    next()
} catch (error) {
    (error)
    return res.status(500).json({
        success:false,
        message:"Something Went Wrong While validating the token"
    })
}
}

// student

export const isStudent = (req,res,next)=>{
    try {
        if (req.user.accountType !== "Student") {
            return res.status(401).json({
                success:false,
                message:"This Is Protected Route for Student Only"
            })
        }
        next()
        
    } catch (error) {
       return res.status(500).json({
        success:false,
        message:"User Role Can Not Be Verified,please try again"
       }) 
    }
}


// instrucotr
export const isInstructor = (req,res,next)=>{
    try {
        if (req.user.accountType !== "Instructor") {
            return res.status(401).json({
                success:false,
                message:"This Is Protected Route for Instructor Only"
            })
        }
        next()
        
    } catch (error) {
       return res.status(500).json({
        success:false,
        message:"User Role Can Not Be Verified,please try again"
       }) 
    }
}


// admin

export const isAdmin = (req,res,next)=>{
    try {
        if (req.user.accountType !== "Admin") {
            return res.status(401).json({
                success:false,
                message:"This Is Protected Route for Admin Only"
            })
        }
        next()
        
    } catch (error) {
       return res.status(500).json({
        success:false,
        message:"User Role Can Not Be Verified,please try again"
       }) 
    }
}