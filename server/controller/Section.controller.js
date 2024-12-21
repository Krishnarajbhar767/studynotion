import { Section } from "../models/Section.model.js";
import { Course } from "../models/Course.model.js";
export async function createSection(req, res) {
  try {
    //data fetch
    const { sectionName, courseId } = req.body;
    // data validation
    if (!courseName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Missing Property",
      });
    }

    // create section
    const newSection = await Section.create(
      {
        sectionName,
      },
      { new: true }
    );
    // update course with section ObjcetID
    const updatedCourseDetails = await Course.findByIdAndUpdate(
      { id: courseId },
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      { new: true }
    )
      .populate(["courseContent", "subSection"])
      .exec();
    // return response
    return res.status(200).json({
      success: true,
      message: "Course Created Succesfully",
      data: updatedCourseDetails,
    });
  } catch (error) {
    ("Error While Creating Sub Section");
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

export async function updateSection() {
        try {
               //data input
               const {sectionName,sectionId} = req.body;
               //data validation
               if (!sectionName || !sectionId) {
                return res.status(400).json({
                  success: false,
                  message: "Missing Property",
                });
              }
               // update the data
               const updatedSection = Section.findByIdAndUpdate({id:sectionId}, 
                        {
                                $push:{sectionName:sectionName}
                        },{new:true}
               )
               // return response

               return res.status(200).json({
                success:true,
                masssage:"Section Updated SuccessFully..",
                data:updatedSection
               })
        } catch (error) {
                ("Error While Updating The Section");
                return res.status(500).json({
                        success:false,
                        error:error.message
                })
        }
}

export async function deleteSection(req,res) {
        try {
                //get id --  assuming id is sending through paramas
                const {sectionId} = req.params
                // find and delate
                const deletedSection = Section.findByIdAndDelete({id:sectionId});
                // TODO : do we need to delete this is also from course Schema
                // return response
                return res.status(200).json({
                        success:true,
                        message:"Section Deleted Successfully."
                })
                
        } catch (error) {
                ("Error While Deleling The Section");
                return res.status(500).json({
                        success:false,
                        error:error.message
                })
        }
}