import { combineReducers } from "@reduxjs/toolkit";
import  authSclice  from "../redux/slices/authSlice";
import cartReducer from "../redux/slices/cartSlice"
import profileReducer from "../redux/slices/profileSlice"
import courseReducer from "../redux/slices/courseSlice"
const rootReducer = combineReducers({
auth:authSclice,
cart:cartReducer,
profile:profileReducer,
course:courseReducer
})

export default rootReducer;