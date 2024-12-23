import mongoose from "mongoose";
import { Course } from "../models/Course.model.js";
import { Profile } from "../models/Profile.model.js";
import { User } from "../models/User.model.js";
import uploadFile from "../utils/imageUpload.js";
import JWT from "jsonwebtoken"
export async function updateProfile(req, res) {
  try {
    // HW: request schdule
    const userId = req.user.id;
    const { gender, dob = "", about = "", contactNumber } = req.body;

    // validation
    if (!gender || !contactNumber || !userId) {
      return res.status().json({
        success: false,
        message: "All Field Are Required",
      });
    }

    // find Profile by user Id

    const userDetails = await User.findById(userId);
    const profileId = userDetails.additionalDetails;

    const userProfile = await Profile.findById(profileId);

    userProfile.about = about;
    userProfile.contactNumber = contactNumber;
    userProfile.gender = gender;
    userProfile.dob = dob;

    const updatedProfile = await userProfile.save();

    return res.status(200).json({
      success: true,
      message: "Profile Updated SuccessFully.",
      userProfile,
    });
  } catch (error) {
    ("Error While Updating The Profile");
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

export async function deleteAccount(req, res) {
  try {
    // get userId
    const userId = req.user.id;
    // validate userId
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User Id Are Required",
      });
    }

    const userDetails = await User.findById(userId);
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: "User Dose Not Exist",
      });
    }
    // delete profile of User
    const userProfileId = new mongoose.Types.ObjectId(
      userDetails.additionalDetails
    );

    const deletedUserProfile = await Profile.findByIdAndDelete(userProfileId);
    // delete user
    const deletedUser = await User.findByIdAndDelete(userId);
    //Todo :HW : deleted also from course enrolled user and also from Ranting ANd Rewies;
    // and return response
    // Read Crons Jobs
    return res.status(200).json({
      success: true,
      message: "User Deleted SuccessFully.",
    });
  } catch (error) {
    ("Error While Deleting The User ");
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

export async function getAllUserDetails(req, res) {
  try {
    const userId = req.user.id;

    const userDetails = await User.findById(userId)
      .populate("accountType")
      .populate("additionalDetails")
      .populate("courses")
      .populate("courseProgress")
      .exec();

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: "User Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User Data Fetched SuccessFully.",
      data: userDetails,
    });
  } catch (error) {
    (error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

// export async function getEnrolledCourses() {
//   try {
//     const userId = req.body.id;
//     const enrolledCourses = await Course.find({ user: userId });

//     if (!enrolledCourses) {
//       return res.status(403).json({
//         success: false,
//         message: "You Do Not Have Enrolled In Any Courses",
//       });
//     }
//     return res.status(200).json({
//       success: true,
//       data: enrolledCourses,
//     });
//   } catch (error) {
//     (error);
//     return res.status(500).json({
//       success: false,
//       error: error.message,
//     });
//   }
// }

export async function updateDisplayPicture() {
  try {
    const userId = req.body.id;
    const profilePicture = req.files.profilePicture;
    if (!profilePicture) {
      return res.status(400).json({
        success: false,
        message: "Please Upload The Image File",
      });
    }
    const profileUrl = await uploadFile(
      profilePicture,
      process.env.FOLDER_NAME
    );

    if (!profilePicture) {
      return res.status(400).json({
        success: false,
        message:
          "Some Thing Went Wrong While Uploading the image on cloudinary.",
      });
    }
    const updatedUser = await User.findByIdAndUpdate(userId, {
      avtar: profileUrl,
    });
    return res.status(200).json({
      success: true,
      message: "Profile Picture Updated Successfully.",
      data: profileUrl,
    });
  } catch (error) {
    (error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

export const  getEnrolledCourses = async(req,res)=>{
  try {
    const userId = req.user.id;
    console.log("Printing UserID GetEnrolled Courses",userId)
    const user = await User.findById(userId).populate({
      path: "courses",
      populate: {
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      },
    })
    .exec();
    user.toObject();
    if (!user) {
      return res.status(400).json({
        success:false,
        message:"User Not Found",
      })
    };
    return res.status(200).json({
      success:true,
      data:user.courses,
      message:"Enrolled Course Fetched Successfully."
    })
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"Something Went Wrong While Fetching Enrolled Courses",
      error:error.message
    })
  }
  }
  