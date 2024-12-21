import { v2 as cloudinary } from 'cloudinary';

export default async function connectCloudinary (){
try {
             // Configuration
     cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_SECRET_KEY
    });
} catch (error) {
       ("Error While Connecting The Cloudinary",error) 
}
}