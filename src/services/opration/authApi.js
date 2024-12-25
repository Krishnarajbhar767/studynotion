import toast from "react-hot-toast";
import { setError, setloading, setToken } from "../../redux/slices/authSlice";
import { apiConncetor } from "../apiConnector";
import { AUTHAPIS } from "../apis.js";
import { setUser } from "../../redux/slices/profileSlice.js";
import { resetCart } from "../../redux/slices/cartSlice.js";
import { useDispatch } from "react-redux";
import { resetCourseState, setCategories } from "../../redux/slices/courseSlice.js";
export function getResetToken(email, setEmailSent) {
  return async (dispatch) => {
    dispatch(setloading(true));
    try {
      const response = await apiConncetor("POST", AUTHAPIS.RESETPSWTKN, {
        email,
      });
      ("reset password response", response);
      if (!response.data.success) {
        return new Error(response.data.message);
      }
      toast.success("Reset Email Sent");
      setEmailSent(true);
    } catch (error) {
      console.log(error)
      toast.error("Failed to send reset email");
    }
    dispatch(setloading(false));
  };
}

export function resetPassword(password, confirmPassword, resetToken) {
  (resetToken);
  return async (dispach) => {
    dispach(setloading(true));
    try {
      const response = await apiConncetor("POST", AUTHAPIS.RESET_PASSWORD, {
        password,
        confirmPassword,
        resetToken,
      });
      ("Printing Response", response);

      if (!response?.data.success) {
        throw new Error(`Got An Error ${response?.data.message}`);
      }

      toast.success("Password has been reset successfully.");
      dispach(setError(false));
    } catch (error) {
      dispach(setError(true));

      if (error.response) {
        toast.error(`${error.response.data.message}`);
      } else if (error.request) {
        toast.error("Failed To Connect Sever");
      } else {
        toast.error("Unexpected Error", error.message);
      }
    } finally {
      dispach(setloading(false));
    }
  };
}



export function sendOtp(email, navigate) {
  return async (dispach) => {
    setloading(true);
    try {
      const response = await apiConncetor("POST", AUTHAPIS.SEND_OTP, {
        email: email,
      });
      ("Printing Send OTP REsponse", response);

      if (!response.data.success) {
        throw new Error(`Something Went Wrong ${response.data.message}`);
      }
      dispach(setError(false));
      toast.success("OTP Sent Successfully");
      navigate("/verify-email");
    } catch (error) {
      dispach(setError(true));
      if (error.response) {
        toast.error(`${error.response.data.message}`);
      } else if (error.request) {
        toast.error("Failed To Connect Sever");
      } else {
        toast.error("Unexpected Error", error.message);
      }
    } finally {
      setloading(false);
    }
  };
}

export function signUp(
        accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  navigate,
  otp
) {
  return async (dispach) => {
    dispach(setloading(true));
    try {
      const response = await apiConncetor("POST", AUTHAPIS.SIGN_UP, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      });
      const userData = response.data.data;
      toast.success("Signup Succesfully");
      navigate("/login");
    } catch (error) {
        if (error.response) {
                toast.error(`${error.response.data.message}`);
              } else if (error.request) {
                toast.error("Failed To Connect Sever");
              } else {
                toast.error("Unexpected Error", error.message);
              }
    } finally {
      dispach(setloading(false));
    }
  };
}

export const logIn = (email,password,navigate)=>{
return async (dispach)=>{
        dispach(setloading(true))
        try {
                const response = await apiConncetor("POST",AUTHAPIS.LOG_IN,{email,password});
                const token = response.data.token;
                const user = response.data.user;
                dispach(setToken(token));
                dispach(setUser(user));
                localStorage.setItem("token",token);
                localStorage.setItem("user",JSON.stringify(user));
                toast.success(`Login In Successfully`)
                navigate("/dashboard/my-profile")
        } catch (error) {
                 if (error.response) {
                toast.error(`${error.response.data.message}`);
              } else if (error.request) {
                toast.error("Failed To Connect Sever");
              } else if(error.message){
                toast.error(`Unexepected Axios Error ${error.message}`)
              }else{
                toast.error(`Some Uncought Error ${error.message}`)
              }
        }finally{
                dispach(setloading(false))
        }
}
}

export function logOut(navigate) {
  console.log("ENter LOG OUt FN")
  return async(dispatch)=>{

    dispatch(setToken(null))
    dispatch(setUser(null))
    dispatch(setCategories([]));
    dispatch(resetCart())
    dispatch(resetCourseState())
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // localStorage.removeItem("sublinks");
 
    toast.success("Logged Out")
    navigate("/")
  }
}

