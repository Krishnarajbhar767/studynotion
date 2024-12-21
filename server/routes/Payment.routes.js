import e from "express";
import { isAuthenticated } from "../middlewere/Auth.js";
import {capturePayment,verifySignature}  from "../controller/Payment.controller.js";

const paymentRouter = e.Router();

paymentRouter.post("/capture-payment",isAuthenticated,capturePayment);
paymentRouter.post("/verify-signature",isAuthenticated,verifySignature)

export default paymentRouter