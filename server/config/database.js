import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();
export const connectDatabase = ()=>{
    mongoose.connect(process.env.LOCAL_DATABASE_URL).then((data)=>{
        console.log("Database Connection Succesfull")
    })
    .catch((error)=>{
       console.log("database Connection Failed");
        console.error(error);
        process.exit(1);
    });
}

