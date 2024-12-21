import mongoose from "mongoose";

export const categorySchema = new mongoose.Schema({
name:{
    type:String,
    trim:true,
    required:true
},
description:{
    type:String,

},
courses:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Course"
}
})

export const Category = mongoose.model("Category",categorySchema)