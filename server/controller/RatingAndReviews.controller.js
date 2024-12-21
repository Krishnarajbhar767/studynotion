import { Rating } from "../models/Rating.model.js"; 
import { Course } from "../models/Course.model.js";
import { errorMonitor } from "nodemailer/lib/xoauth2";
import mongoose from "mongoose";
export  async function createRating(req,res){
try {
        const userId = req.user.id
const {courseId,rating,review} = req.body;
const courseDetails = await Course.findById(courseId);
if (!courseDetails.studentEnrolled.includes(userId)) { // may be i need to convert this user id into mongoose object
        return res.status(400).json({
                success:false,
                message:"User not enrolled the course. Please Enroll the Course first."
        })
};

const isAlreadyReviewed = Rating.findOne({course:courseId,user:userId});

if (isAlreadyReviewed) {
        return res.status(400).json({
             success:false,
              message:"User Already Written A review"  
        })
}

const newRating =await Rating.create({
        user:userId,
        course:courseId,
        rating,
        review
})

const updatedCourse =await Course.findByIdAndUpdate({_id:courseId},{$push:{ratingAndReviews:newRating._id}},{new:true})

return res.status(200).json({
        success:true,
        message:"Review Added SuccesFully.",
        data:newRating
})
} catch (error) {
        return res.status(500).json({
                success:false,
                error:error.message
        })
}
}

export  async function averageRating (req,res){

        try {
                const {courseId} = req.body;
                const result  = Rating.aggregate([
                        {
                                $match:{course:new mongoose.Types.ObjcectId(courseId)}
                        },
                        {$group:{
                                _id:null,
                                averageRating:{$avg:"rating"}
                        }}
                ]);
                if (result.length >0) {
                        return res.status(200).json({
                                success:true,
                                averageRating:result[0].averageRating
                        })
                }else{
                        return res.status(400).json({
                                success:false,
                                message:"No Average rating Found",
                                averageRating:0
                        })
                }
        } catch (error) {
                (error);
                return res.status(500).json({
                        success:false,
                        error:error.message
                })
        }
}

 export  async function getAllRatings(req,res){
        try {
                const allRating = await Rating.find({}).sort({rating:"desc"}).populate({
                        path:"user",
                        select:"firstName lastName email avtar"
                }).populate({
                        path:"course",
                        select:"courseName"
                }).exec();

                return res.status(200).json({
                        success:true,
                        massaeg:"All Review Fetched Successfully.",
                        data:allRating,
                })
        } catch (error) {
                (error);
                return res.status(500).json({
                        success:false,
                        error:error.message
                }) 
        }
 }