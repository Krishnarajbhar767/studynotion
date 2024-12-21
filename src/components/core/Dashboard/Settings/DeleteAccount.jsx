import React from "react";
import { FiTrash2 } from "react-icons/fi";

export default function DeleteAccount() {
  return (
    <div className="my-10 flex flex-col items-start gap-6 rounded-md border border-pink-700 bg-pink-900 p-6 md:flex-row md:items-center md:px-12">
      {/* Icon Section */}
      <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700">
        <FiTrash2 className="text-3xl text-pink-200" />
      </div>

      {/* Content Section */}
      <div className="flex flex-col space-y-3">
        <h2 className="text-lg font-semibold text-richblack-5">Delete Account</h2>
        <div className="text-sm text-pink-100">
          <p>Would you like to delete your account?</p>
          <p className="mt-1">
            This account may contain Paid Courses. Deleting your account is
            permanent and will remove all associated data.
          </p>
        </div>
        <button
          type="button"
          className="mt-2 w-fit cursor-pointer rounded-md bg-pink-700 px-4 py-2 text-sm font-medium text-pink-50 hover:bg-pink-600 hover:text-pink-100 transition-all duration-200"
        >
          I want to delete my account
        </button>
      </div>
    </div>
  );
}
