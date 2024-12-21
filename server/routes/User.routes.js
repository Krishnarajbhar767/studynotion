import e from "express";
import { changePassword, login, sendOtp, signUp } from "../controller/Auth.js";
import { resetPassword, resetPasswordToken } from "../controller/ResetPassword.js";
import { isAuthenticated } from "../middlewere/Auth.js";

const userRoutes = e.Router();

userRoutes.post("/sendotp",sendOtp);
userRoutes.post("/signup",signUp);
userRoutes.post("/login",login);
userRoutes.post("/reset-password-token",resetPasswordToken);
userRoutes.post("/reset-password",resetPassword);
userRoutes.post("/change-password",isAuthenticated,changePassword);

export default userRoutes;
