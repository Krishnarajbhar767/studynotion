import React from "react";
import { FiUpload } from "react-icons/fi";

export default function ChangeProfilePicture() {
  return (
    <div className="flex flex-col items-center gap-y-6 rounded-md border border-richblack-700 bg-richblack-800 p-8 md:flex-row md:justify-between md:px-12 text-richblack-5">
      {/* Profile Picture Section */}
      <div className="flex items-center gap-x-4">
        <img
          src="https://via.placeholder.com/78"
          alt="profile-placeholder"
          className="aspect-square w-20 h-20 rounded-full object-cover border-2 border-yellow-500"
        />
        <div className="space-y-2">
          <p className="text-lg font-medium">Change Profile Picture</p>
          <div className="flex flex-row gap-3">
            <input
              type="file"
              className="hidden"
              accept="image/png, image/gif, image/jpeg"
            />
            <button className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50 hover:bg-yellow-500 hover:text-richblack-900 transition-all duration-200">
              Select
            </button>
            <button className="flex items-center gap-2 rounded-md bg-yellow-500 py-2 px-5 font-semibold text-richblack-900 hover:bg-yellow-400 transition-all duration-200">
              <FiUpload className="text-xl" />
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
