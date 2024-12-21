import mongoose, { Schema } from "mongoose";

export const courseSchema = new Schema({
  courseName: {
    type: String,
  },
  courseDescription: {
    type: String,
  },
  instructor:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  whatYouWillLearn:{
    type:String,
  },
  courseContent:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Section"
  }],
  ratingAndReviews:[{type:mongoose.Schema.Types.ObjectId,
    ref:"Rating"
  }],
  price:{
    type:Number
  },
  thumbnail:{
    type:String
  },
  category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Category"
  },
  studentEnrolled:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  }],
  status:{
    type:String,
    enum:["Draft","Published"]
  }
});

export const Course = mongoose.model("Course", courseSchema);
