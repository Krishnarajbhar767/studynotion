import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import { logIn } from "../../../services/opration/authApi";

function LoginForm() {
  const [loginData,setLoginData] = useState({
    email:"",
    password:""
  })
  const [showPassword,setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispach = useDispatch();
   function handleOnSubmit(e) {
    e.preventDefault();
    dispach(logIn(loginData.email,loginData.password,navigate));

  }


  return (
    <form
      onSubmit={handleOnSubmit}
      onChange={(e)=>{
        setLoginData((prev)=>(
          {
            ...prev,
            [e.target.name]:e.target.value
          }
        ))
      }}
      action="submit"
      className="mt-6 flex w-full flex-col gap-y-4"
    >
      <label className="w-full">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Email Address <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          value={loginData.email}
          type="text"
          name="email"
          placeholder="Enter email address"
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
        />
      </label>
      <label className="relative">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Password <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type={`${showPassword ? "text" :"password"}`}
          value={loginData.password}
          name="password"
          placeholder="Enter Password"
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
        />
        <span className="absolute right-3 top-[38px] z-[10] cursor-pointer" onClick={()=>setShowPassword(!showPassword)}>
          {
            showPassword ? <AiOutlineEye fontSize={24} fill="#AFB2BF" /> : <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
          }
        </span>
        <Link to="/forgot-password">
          <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
            Forgot Password
          </p>
        </Link>
      </label>
      <button
        type="submit"
        className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
      >
        Sign In
      </button>
    </form>
  )
}

export default LoginForm
