import toast from "react-hot-toast";
import { apiConncetor } from "../apiConnector";
import { SETTINGS_APIS } from "../apis";
import { setLoading } from "../../redux/slices/profileSlice";

export const changePassword =(data,email,token,loading)=>{
const {oldPassword,newPassword,confirmPassword} = data;

return async(dispach)=>{ 
  dispach(setLoading(true))
  try {
        
        const response = await apiConncetor("POST",SETTINGS_APIS.CHANGE_PASSWORD,{oldPassword,newPassword,confirmPassword,email,token});
        if (!response.data.success) {
             throw new Error("Something Went Wrong")   
        }
        toast.success("Password Changed.")
} catch (error) {
        if (error.response) {
                toast.error(`${error.response.data.message}`);
              } else if (error.request) {
                toast.error("Failed To Connect Sever");
              } else {
                toast.error("Unexpected Error", error.message);
              }
}finally{
  dispach(setLoading(false))
}
}
}