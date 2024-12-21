import React from "react";

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"];

export default function EditProfile() {
  return (
    <form className="space-y-8">
      {/* Profile Information */}
      <div className="rounded-md border border-richblack-700 bg-richblack-800 p-6 md:p-8">
        <h2 className="text-xl font-semibold text-richblack-5 mb-6">
          Profile Information
        </h2>

        {/* Form Fields */}
        <div className="space-y-6">
          {/* Row 1 */}
          <div className="flex flex-col gap-5 md:flex-row">
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="firstName" className="text-sm text-richblack-100">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="Enter your first name"
                className="w-full rounded-md bg-richblack-700 p-3 text-sm text-richblack-100 placeholder:text-richblack-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="lastName" className="text-sm text-richblack-100">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Enter your last name"
                className="w-full rounded-md bg-richblack-700 p-3 text-sm text-richblack-100 placeholder:text-richblack-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex flex-col gap-5 md:flex-row">
            <div className="flex flex-col w-full gap-2">
              <label
                htmlFor="dateOfBirth"
                className="text-sm text-richblack-100"
              >
                Date of Birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                className="w-full rounded-md bg-richblack-700 p-3 text-sm text-richblack-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="gender" className="text-sm text-richblack-100">
                Gender
              </label>
              <select
                id="gender"
                className="w-full rounded-md bg-richblack-700 p-3 text-sm text-richblack-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                {genders.map((gender, index) => (
                  <option key={index} value={gender}>
                    {gender}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 3 */}
          <div className="flex flex-col gap-5 md:flex-row">
            <div className="flex flex-col w-full gap-2">
              <label
                htmlFor="contactNumber"
                className="text-sm text-richblack-100"
              >
                Contact Number
              </label>
              <input
                type="tel"
                id="contactNumber"
                placeholder="Enter your contact number"
                className="w-full rounded-md bg-richblack-700 p-3 text-sm text-richblack-100 placeholder:text-richblack-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="about" className="text-sm text-richblack-100">
                About
              </label>
              <input
                type="text"
                id="about"
                placeholder="Enter bio details"
                className="w-full rounded-md bg-richblack-700 p-3 text-sm text-richblack-100 placeholder:text-richblack-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          className="rounded-md bg-richblack-700 py-2 px-5 text-sm font-semibold text-richblack-50 hover:bg-richblack-600 focus:ring-2 focus:ring-yellow-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-yellow-500 py-2 px-5 text-sm font-semibold text-richblack-900 hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-500"
        >
          Save
        </button>
      </div>
    </form>
  );
}
