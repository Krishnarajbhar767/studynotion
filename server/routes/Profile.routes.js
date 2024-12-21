import e from "express";
import {updateProfile,deleteAccount,getAllUserDetails,getEnrolledCourses} from "../controller/Profile.controller.js";

import { isAuthenticated } from "../middlewere/Auth.js";
const profileRouter = e.Router();

profileRouter.put("/update-profile",isAuthenticated,updateProfile);
profileRouter.delete("/deleteProfile",isAuthenticated,deleteAccount);
profileRouter.get("/get-user-details",isAuthenticated,getAllUserDetails);
profileRouter.get("/get-enrolled-courses",isAuthenticated,getEnrolledCourses);
profileRouter.put("/update-display-picture",isAuthenticated,)

export default profileRouter;