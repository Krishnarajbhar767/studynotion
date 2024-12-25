import { v2 as cloudinary } from 'cloudinary';

export default async function uploadFile(file,folder,height,quality) {
        const options  = {folder};

        if (height) {
                options.height = height;
        };

        if (quality) {
                options.quality = quality;
        }
        options.resource_type = "auto";
         
        const response = await cloudinary.uploader.upload(file.tempFilePath,options)
        return response.url;
}