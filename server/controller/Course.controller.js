import { Category } from "../models/Category.model.js";
import { User } from "../models/User.model.js";
import { Course } from "../models/Course.model.js";
import uploadImage from "../utils/imageUpload.js";
import *as JWT  from "jsonwebtoken";
export async function createCourse(req, res) {
  try {
    const { courseName, courseDescription, whatYouWillLearn, price, category } =
      req.body; // get Data

    const thumbnail = req.files.thumbnailImage; // get thumbnail

    //validation

    if (!courseName || courseDescription || !whatYouWillLearn || !category) {
      res.status(400).json({
        success: false,
        message: "All Fieald Are Required",
      });
    }

    const userId = req.user.id;
    const instructorDetails = await User.findById(userId);
    ("INstructor Details", instructorDetails);

    if (!instructorDetails) {
      return res.status(400).json({
        success: false,
        message: "Instructor Details Not Found",
      });
    }

    //check given category is valid or not

    const categoryDetails = Category.findById(category);

    if (!categoryDetails) {
      return res.status(400).json({
        success: false,
        message: "category Details Not Found",
      });
    }
    //uplkoad image to cloudinary
    const thumbnailImage = await uploadImage(
      thumbnail,
      process.env.FOLDER_NAME
    );

    //  create an entry for new course

    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn: whatYouWillLearn,
      price,
      category: categoryDetails._id,
      thumbnail: thumbnailImage,
    });
    // add this course to the user Schema of Instructor;

    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      {
        $push: { courses: newCourse._id },
      },
      { new: true }
    );

    // update the category Schema
    await Category.findByIdAndUpdate(
      { id: category },
      {
        $push: { courses: newCourse._id },
      }
    );

    return res.status(200).json({
      success: false,
      message: "Course Created Successfully...",
      data: newCourse,
    });
  } catch (error) {
    ("Some Error Accoured While Craeting New Course", error);
    return res.status(500).json({
      success: false,
      message: error.maassage,
    });
  }
}

export  async function showAllCourses() {
  try {
    const allCourses = await Course.find(
      {},
      {
        courseName: true,
        courseDescription: true,
        price: true,
        thumbnail: true,
        studentEnrolled: true,
        ratingAndReviews: true,
        instructor: true,
      }
    )
      .populate("instructor")
      .exec();
    if (!allCourses) {
      return res.status(400).json({
        success: false,
        message: "No Course Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Fetched All Course Successfully.",
      data: allCourses,
    });
  } catch (error) {
    ("Error While Getting All Courses", error);

    return res.status(500).json({ success: false, message: error.message });
  }
}


export  async function getCourseDetails(req, res) {
  try {
    const { courseId } = req.body;
    const courseDetails = await Course.findById(courseId).populate({
      path: "intructor",
      populate: {
        path: "additionalDetails"
      }
    }).populate("category").populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection"
        }
      }).exec();

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: "Course Details Not Found"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Course Details Found Successfully.",
      data: courseDetails
    })

  } catch (error) {
    ("Error While Getting  Course Details", error);

    return res.status(500).json({ success: false, message: error.message });
  }
}


