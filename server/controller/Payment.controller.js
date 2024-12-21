import { instance } from "../config/razorpay.js";
import { Course } from "../models/Course.model.js";
import { User } from "../models/User.model.js";
import { sendMail } from "../utils/sendMail.js";
import courseEnrollmentEmail from "../mail/template/courseEnrollmentEmail.js";
import mongoose from "mongoose";

// capture the payemnt and initiate the order

export  async function capturePayment(req, res) {
  // get courseId And UserID
  const { course_id } = req.body;
  const userId = req.user.id;
  // validation
  if (!course_id || !userId) {
    return res.status(400).json({
      success: false,
      message: "User ID And Course ID Both Are Required",
    });
  }
  // validCourseId,
  let course;
  try {
    course = await Course.findById(course_id);
    if (!course) {
      res.status(400).json({
        success: false,
        message: "Course Dose Not Exist",
      });
    }

    // validUserID
    // userAlready Paid for the same course
    //     const uid = new mongoose.Types.ObjectId(userId)
    if (course.studentEnrolled.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: "Student Is Already Enrolled.",
      });
    }
    // order craeted
    // return response
  } catch (error) {
    ("Error While Validating Course .", error);

    return res.status(500).json({ success: false, message: error.message });
  }

  const amount = course.price;
  const currency = "INR";

  const option = {
    amount: amount * 100,
    currency,
    receipt: Math.random(Date.now()).toString(),
    notes: {
      courseId: course_id,
      userId,
    },
  };

  try {
    //intiate payment using raxoprpay
    const paymentResponse = new instance.orders.create(option);
    (paymentResponse);

    return res.status(200).json({
      success: true,
      courseName: course.courseName,
      courseDescription: course.courseDescription,
      orderId: paymentResponse.id,
      currency: paymentResponse.currency,
      amount: paymentResponse.amount,
      thumbnail: course.thumbnail,
    });
  } catch (error) {
    ("Error While Capturing The Payment .", error);

    return res.status(500).json({ success: false, message: error.message });
  }
}


//  verify signature of razorpay and server

export  async function verifySignature(req,res) {
const webHookSecret = "12345";
const signature = req.headers['x-razorpay-signature'];

const shasum = crypto.createHmac("sha256",webHookSecret);
shasum.update(JSON.stringify(req.body));
const digest = shasum.digest("hex");

if (signature === digest) {
        ("Payment is Authorized");
        const {courseId,userId} = req.body.payload.entity.notes; // need to check 
        try {
                // find the course make enrolled in this
                const enrolledCourse = await Course.findByIdAndUpdate({_id:courseId},{studentEnrolled:{
                        $push:{userId}
                }}, {new:true})
                if(!enrolledCourse){
                        return res.status(400).json({
                                success:false,
                                message:"Course Not Found"
                        })
                };

                const student = await User.findByIdAndUpdate({_id:userId},{
                        $push:{courses:courseId}
                },{new:true});
                
                const emailResponse = sendMail(student.email,

                "Congratulation From CodeHelp",
                        "Congratulation, Your Are onboarded into new Course",)

                        (emailResponse);

                        return res.status(200).json({
                                success:true,
                                message:"Signature Varified and Course Added Successfully."
                        })
        } catch (error) {
            
                return res.status(500).json({ success: false, message: error.message });
              }
}else{
        return res.status(400).json({
                successs:false,
                message:"Signature Not Verified.",
                error:error.message
        })
};

}
