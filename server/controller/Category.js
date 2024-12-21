import  { Category } from "../models/Category.model.js";
import { User } from "../models/User.model.js";

export const createCategory = async(req,res)=>{
try {
        const {name,description} = req.body;

        if (!name || !description) {
                return res.status(401).json({
                        success:false,
                        message:"All Field Are Required !", 
                
                });

        };

        const categoryDetails  = await Category.create({
                name:name,
                description:description
        });

return res.status(200).json({
        success:true,
        message:"Category Created Succesfully.",
        data:categoryDetails
})
} catch (error) {
        (error);
        return res.status(500).json({
                success:false,
                message:error.message
        })
}
};


export const showAllCategories = async (req,res)=>{
        try {
                const allCategory = await Category.find({});
                return res.status(200).json({
                        success:true,
                        data:allCategory,
                })
        } catch (error) {
                (error);
        return res.stauts(500).json({
                success:false,
                message:error.message
        })
        }
}

export   async function categoryPageDetails(req,res) {
        try {
          // get cat id
          const {categoryId} =req.body; 
          // fetch course by category
          const selectedCategory = await Category.findById(categoryId).populate("courses").exec();
          if (!selectedCategory) {
                return res.status(403).json({
                        success:false,
                        message:"Data Not Found"
                })
          };

          const diffrentCategories = await Category.find({_id:{$ne:categoryId}}).populate("courses").exec();
          // HW - Top selling course
          return res.status(200).json({
                success:true,
                data:{
                        selectedCategory,
                        diffrentCategories
                }
          })
        } catch (error) {
          (error);
          return res.status(500).json({
                  success:false,
                  error:error.message
          }) 
        }
      }