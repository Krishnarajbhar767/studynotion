import e from "express";
import { isAdmin,isInstructor,isStudent,isAuthenticated } from "../middlewere/Auth.js";
import  {showAllCourses, createCourse,getCourseDetails }  from "../controller/Course.controller.js";
import { createSection, deleteSection, updateSection } from "../controller/Section.controller.js";
import createSubSection from "../controller/Subsection.controller.js";
import { createCategory, showAllCategories } from "../controller/Category.js";

const courseRouter = e.Router();


courseRouter.post("/create-course",isAuthenticated,isInstructor,createCourse);
courseRouter.get("/get-all-course",isAuthenticated,showAllCourses);
courseRouter.get("/get-course-details",isAuthenticated,getCourseDetails)
courseRouter.post("/create-section",isAuthenticated,isInstructor,createSection);
courseRouter.put("/update-section",isAuthenticated,isInstructor,updateSection);
courseRouter.delete("/delete-section",isAuthenticated,isInstructor,deleteSection);
courseRouter.post("/create-subsection",isAuthenticated,isInstructor,createSubSection);
courseRouter.get("/showAllCategories",showAllCategories)
courseRouter.post("/createCategory",isAuthenticated,isAdmin,createCategory)
export default courseRouter;
