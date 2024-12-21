import mongoose, {Schema} from "mongoose";

export const UserSchema = new Schema({
    firstName:{
        type:String,
        required:[true, "First Name Is required"],
    },
    lastName:{
        type:String,
        required:[true, "Last Name Is required"],
        trim:true
    },
    email: {
        type: String,
        required: true,
        lowercase: true, // Corrected 
        },
    password:{
        type:String,
        required:true
    },
    resetToken:{
        type:String,
    },
    resetTokenExpire:{
        type:Date,

    },

    accountType:{
        type:String,
        enum:["Admin","Student","Instructor"]
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile"
    },
    courses:[
        {type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        }
    ],
    avtar:{
        type:String,
    
    },
    courseProgress:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"CourseProgress"
    }]
},{timestamps:true});

export const User = mongoose.model("User",UserSchema);