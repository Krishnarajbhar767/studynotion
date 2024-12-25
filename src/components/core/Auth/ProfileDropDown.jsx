import React, { useRef, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";
import { setToken } from "../../../redux/slices/authSlice";
import { setUser } from "../../../redux/slices/profileSlice";
import { resetCart } from "../../../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { logOut } from "../../../services/opration/authApi";
function ProfileDropDown() {
  const profileImage = useSelector((state) => state.profile.user.avtar);
  const [openDropDown, setOpenDropDown] = useState(false);
const dispatch = useDispatch();
const navigate = useNavigate();
  const profileDropDownRef = useRef(null);
  function dropDownHandler(e) {
    setOpenDropDown(!openDropDown);
  }

  return (
    <div
      className="relative  group transition-all duration-200"
      ref={profileDropDownRef}
      onClick={dropDownHandler}
    >
      <div className="flex  items-center gap-1">
        <img
          src={profileImage}
          alt="profile"
          width={40}
          className="rounded-full"
        />
        <span className="text-2xl">
          <IoMdArrowDropdown />
        </span>
      </div>
      <div
        className={`w-fit text-lg absolute top-[120%] z-50 divide-richblack-700 overflow-hidden rounded-md border-[1px] pt-2 pb-2 border-richblack-700 bg-richblack-800 text-richblack-200 -left-10 transition-all duration-200 ${
          openDropDown ? "visible" : "invisible"
        }`}
      >
        <Link to={"/dashboard/my-profile"}>
          <div className="flex items-center gap-3   w-fit p-2 cursor-pointer hover:bg-richblack-700 hover:text-richblack-5 font-light">
            <MdOutlineDashboard />
            <h1>Dashboard</h1>
          </div>
        </Link>
        
          <div onClick={()=>dispatch(logOut(navigate))} className="flex items-center gap-3 p-2  hover:bg-richblack-700  hover:text-richblack-5 cursor-pointer font-light">
            <IoLogOutOutline />
            <h1>Log Out</h1>
          </div>

      </div>
    </div>
  );logOut
}

export default ProfileDropDown;
