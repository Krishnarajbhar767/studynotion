import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../../../services/opration/settingsApi";

export default function ChangePasswordProfile() {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {email} = useSelector((state)=>state.profile.user);

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors,isLoading,isSubmitting,isSubmitSuccessful },
  } = useForm();

  const submitPasswordForm = (data) => {
    dispatch(changePassword(data,email))
  };

  return (
   <div>
         <form onSubmit={handleSubmit(submitPasswordForm)}>
      <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <h2 className="text-lg font-semibold text-richblack-5">Change Password</h2>
        
        <div className="flex flex-col gap-5 lg:flex-row">
          {/* Old Password */}
          <div className="relative flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="oldPassword" className="text-richblack-200">Current Password</label>
            <div className="relative">
              <input
                type={showOldPassword ? "text" : "password"}
                id="oldPassword"
                placeholder="Enter Current Password"
                className="w-full rounded-md border border-richblack-600 bg-richblack-900 p-3 text-white focus:border-yellow-500 focus:outline-none"
                {...register("oldPassword", { required: "Please enter your Current Password." })}
              />
              <span
                onClick={() => setShowOldPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-richblack-300"
              >
                {showOldPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} />
                ) : (
                  <AiOutlineEye fontSize={24} />
                )}
              </span>
            </div>
            {errors.oldPassword && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                {errors.oldPassword.message}
              </span>
            )}
          </div>

          {/* New Password */}
          <div className="relative flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="newPassword" className="text-richblack-200">New Password</label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                placeholder="Enter New Password"
                className="w-full rounded-md border border-richblack-600 bg-richblack-900 p-3 text-white focus:border-yellow-500 focus:outline-none"
                {...register("newPassword", { required: "Please enter your New Password." })}
              />
              <span
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-richblack-300"
              >
                {showNewPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} />
                ) : (
                  <AiOutlineEye fontSize={24} />
                )}
              </span>
            </div>
            {errors.newPassword && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                {errors.newPassword.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-5 lg:flex-row">
          {/* Confirm Password */}
          <div className="relative flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="confirmPassword" className="text-richblack-200">Confirm New Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Confirm New Password"
                className="w-full rounded-md border border-richblack-600 bg-richblack-900 p-3 text-white focus:border-yellow-500 focus:outline-none"
                {...register("confirmPassword", { required: "Please confirm your New Password." })}
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-richblack-300"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} />
                ) : (
                  <AiOutlineEye fontSize={24} />
                )}
              </span>
            </div>
            {errors.confirmPassword && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <button
        onClick={()=>reset()}
          type="button"
          className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50 hover:bg-richblack-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="cursor-pointer rounded-md bg-yellow-500 py-2 px-5 font-semibold text-richblack-900 hover:bg-yellow-600"
        >
          Update
        </button>
      </div>
    </form>
   </div>
  );
}
