import mongoose, {Schema} from "mongoose";

const profileSchema = new Schema({
    gender:{
        type:String,
        enum:["MALE","FEMALE","OTHER"]
    },
    dob:{
        type:String,

    },
    about:{
        type:String,

    },
    contactNumber:{
        type:String
    }
})

export const Profile = mongoose.model("Profile",profileSchema)