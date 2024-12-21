import uploadFile from "../utils/imageUpload.js";
import {Section} from "../models/Section.model.js"

export default async function createSubSection() {
      try {
        
        const {title,description,sectionId,timeDuration} = req.body;
        const videoFile = req.files.video;
        if (!description || !title || !videoFile || !sectionId || !timeDuration) {
                return res.status(400).json({
                  success: false,
                  message: "Missing Property",
                });
              }
              //upload video on server and get secure url 
        const videoUrl = await uploadFile(videoFile,process.env.FOLDER_NAME);

        const newSubSection = await SubSection.create({
                title,
                description,
                videoUrl,
                timeDuration
        })
        // update section with this newly craeted sub section
        const updatedSection = await  Section.findByIdAndUpdate({_id:sectionId},
                {
                        $push:{subSection:newSubSection._id}
                },
                {new : true}
        );
        //HW :log subsection after populating SubSection
        // return response and Done!!!

        return res.status(200).json({
                success:true,
                message:"sub section created SuccessFully.",
                data:newSubSection
        })

      } catch (error) {
        ("Error While creating The Sub Section");
        return res.status(500).json({
                success:false,
                error:error.message
        })
} 
}


// HW: updateSubSection Controller
// HW: delete SubSection Controller