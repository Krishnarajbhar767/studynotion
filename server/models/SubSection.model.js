import mongoose, { Schema } from "mongoose";

const subSectionSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  videoUrl: {
    type: String,
  },
  timeDuration:{
    type:String,
  },
  
});

export const SubSection = mongoose.model("SubSection", subSectionSchema);
