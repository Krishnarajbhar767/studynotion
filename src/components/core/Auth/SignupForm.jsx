import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { Link, useNavigate } from "react-router-dom"
import Tab from "/src/components/common/Tab"
import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { Student } from "../../../../constant"
import { useDispatch, useSelector } from "react-redux"
import { setSignupData } from "../../../redux/slices/authSlice"
import { sendOtp } from "../../../services/opration/authApi"
function SignupForm() {
  const [formSubmitted,setFormSubmitted] = useState(false);
  const [accountType,setAccountType]= useState(Student);
  const {error} = useSelector((state)=>state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword,setShowPassword] = useState(false)
  const [showConfirmPassword,setConfirmShowPassword] = useState(false)
  const [formData,setFormData] = useState({
    firstName:"",
    lastName:"",
    accountType:"",
    email:"",
    password:"",
    confirmPassword:"",
  });

function handleOnSubmit (e){
  e.preventDefault();
      if (formData.password !== formData.confirmPassword) {
        
          return toast.error("Password do not match")
          
      }
  dispatch(setSignupData({...formData}));
  dispatch(sendOtp(formData.email,navigate))
  if (error === true) {
    return;
  }
  setFormData({
    firstName:"",
    lastName:"",
    accountType:"",
    email:"",
    password:"",
    confirmPassword:"",
  });
  
  }
  return (
    <div>

      {/* Tab */}
      <Tab tabData={[
        { id: 1, tabName: "Student", type: "Student" },
        { id: 2, tabName: "Instructor", type: "Instructor" },
      ]} field={accountType} setField={(data)=>{
        setAccountType((prev)=>data)
      }} 
      
      />
      
      {/* Form */}
      <form className="flex w-full flex-col gap-y-4" action="submit" onSubmit={handleOnSubmit} onChange={(e)=>{
          setFormData((prev)=>(
            {
              ...prev,
              "accountType":accountType,
              [e.target.name]:e.target.value,
            }
          ))
      }}>
        <div className="flex gap-x-4">
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              placeholder="Enter first name"
              name="firstName"
              value={formData.firstName}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
          </label>
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
              value={formData.lastName}
              placeholder="Enter last name"
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
          </label>
        </div>
        
        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="text"
            name="email"
            value={formData.email}
            placeholder="Enter email address"
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
          />
        </label>
        
        <div className="flex gap-x-4">
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Create Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" :"password"}
              name="password"
              value={formData.password}
              placeholder="Enter Password"
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
            />
            <span
            
            className={`absolute right-3 top-[38px] z-[10] cursor-pointer`} onClick={()=>setShowPassword(!showPassword)} >
              {
                showPassword ? <AiOutlineEye fontSize={24} fill="#AFB2BF" /> : <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              }
            </span>
          </label>

          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Confirm Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={`${showConfirmPassword ? "text" :"password"}`}
              name="confirmPassword"
              value={formData.confirmPassword}
              placeholder="Confirm Password"
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
            />
            <span className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            onClick={()=>setConfirmShowPassword(!showConfirmPassword)}
            >
              {
                showConfirmPassword ? <AiOutlineEye fontSize={24} fill="#AFB2BF" /> : <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              }
            </span>
          </label>
        </div>
        
        <button
          type="submit"
          className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
        >
          Create Account
        </button>
      </form>
    </div>
  )
}

export default SignupForm
