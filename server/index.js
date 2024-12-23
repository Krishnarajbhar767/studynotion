import { connectDatabase } from "./config/database.js";
import express from "express";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import connectCloudinary from "./config/cloudinary.js";
import fileUpload from "express-fileupload";
import cors from "cors";
import profileRouter from "./routes/Profile.routes.js";
import paymentRouter from "./routes/Payment.routes.js";
import courseRouter from "./routes/Course.routes.js";
import userRoutes from "./routes/User.routes.js";
import contactRoutes from "./routes/Contact.routes.js";
import { isAuthenticated } from "./middlewere/Auth.js";

// import Dot ENV Varibale
configDotenv();
// connecting to mongodb atlas database


connectDatabase();
// connecting cloudinary server
connectCloudinary();

// intializing express in app varibale
const app = express();
// using fileupload middlewere for easy file upload 

app.use(fileUpload({
        useTempFiles : true,
    tempFileDir : '/tmp/'
}))

// using cors for resourse sharing 
app.use(cors({
    origin:"http://localhost:4000",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}))
// using cookier parser middlewere
app.use(cookieParser())
// using body json parser

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({ extended: true }));

// importing my all routes
app.use("/api/v1/profile",profileRouter);
app.use("/api/v1/payment",paymentRouter);
app.use("/api/v1/course",courseRouter);
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/reach",contactRoutes)


// creating our defualt routes
app.get("/",(req,res)=>{
   return res.status(200).json({
    success:true,
    message:"Evrything is fine."
   })
})

// Startting The Sever 
const PORT = process.env.PORT || 4000;
app.listen(PORT,(req,res)=>{
    console.log(`Server Started At PORT ${PORT}`);
})

