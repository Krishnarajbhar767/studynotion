import e from "express";
import { contactUs } from "../controller/ContactUs.controller.js";

const contactRoutes = e.Router();

contactRoutes.post("/contactus",contactUs);

export default contactRoutes;