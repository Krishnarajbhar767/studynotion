import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import CountryCode from "/src/data/countrycode.json"
import { apiConncetor } from "../../services/apiconnector"
import { contactusEndpoint } from "../../services/apis"
import { FiUser, FiMail, FiPhone, FiMessageCircle } from "react-icons/fi";
import { BiSend } from "react-icons/bi";
import toast from "react-hot-toast"

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm()

  const submitContactForm = async (data) => {
    ("Form Data - ", data);
    try {
      setLoading(true)
      const res = await apiConncetor(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        data
      )
      toast.success("Thank You For Contacting Us.")
      setLoading(false)
    } catch (error) {
      toast.error("Something went wrong ! please try again")
      ("ERROR MESSAGE - ", error.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      })
    }
  }, [reset, isSubmitSuccessful])

  return (
    <form
    className="flex flex-col gap-7 bg-[#0d1321] p-8 rounded-lg shadow-md text-white"
    onSubmit={handleSubmit(submitContactForm)}
  >
    {/* First Name & Last Name */}
    <div className="flex flex-col gap-5 lg:flex-row">
      <div className="flex flex-col gap-2 lg:w-[48%] relative">
        <label htmlFor="firstname" className="text-sm flex items-center gap-1">
          <FiUser /> First Name
        </label>
        <div className="relative">
          <input
            type="text"
            id="firstname"
            placeholder="Enter first name"
            className="w-full p-3 pl-10 bg-[#0d1321] rounded-md border border-gray-700 text-white focus:outline-none focus:border-yellow-400 transition-all duration-300"
            {...register("firstname", { required: true })}
          />
          {/* <FiUser className="absolute left-3 top-4 text-gray-400" /> */}
        </div>
        {errors.firstname && (
          <span className="text-yellow-300 text-xs">
            Please enter your first name.
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2 lg:w-[48%]">
        <label htmlFor="lastname" className="text-sm flex items-center gap-1">
          <FiUser /> Last Name
        </label>
        <div className="relative">
          <input
            type="text"
            id="lastname"
            placeholder="Enter last name"
            className="w-full p-3 pl-10 bg-[#0d1321] rounded-md border border-gray-700 text-white focus:outline-none focus:border-yellow-400 transition-all duration-300"
            {...register("lastname")}
          />
          {/* <FiUser className="absolute left-3 top-4 text-gray-400" /> */}
        </div>
      </div>
    </div>

    {/* Email */}
    <div className="flex flex-col gap-2">
      <label htmlFor="email" className="text-sm flex items-center gap-1">
        <FiMail /> Email Address
      </label>
      <div className="relative">
        <input
          type="email"
          id="email"
          placeholder="Enter email address"
          className="w-full p-3 pl-10 bg-[#0d1321] rounded-md border border-gray-700 text-white focus:outline-none focus:border-yellow-400 transition-all duration-300"
          {...register("email", { required: true })}
        />
        {/* <FiMail className="absolute left-3 top-4 text-gray-400" /> */}
      </div>
      {errors.email && (
        <span className="text-yellow-300 text-xs">
          Please enter a valid email.
        </span>
      )}
    </div>

    {/* Phone Number */}
    <div className="flex flex-col gap-2">
      <label htmlFor="phonenumber" className="text-sm flex items-center gap-1">
        <FiPhone /> Phone Number
      </label>
      <div className="flex gap-3">
        <select
          className="w-[90px] p-3 bg-[#0d1321] border border-gray-700 text-white rounded-md focus:outline-none focus:border-yellow-400"
          {...register("countrycode", { required: true })}
        >
          {CountryCode.map((ele, i) => (
            <option key={i} value={ele.code}>
              {ele.code}
            </option>
          ))}
        </select>
        <div className="relative w-full">
          <input
            onWheel={(e)=>e.target.blur()}
            type="number"
            id="phonenumber"
            placeholder="12345 67890"
            className="w-full p-3 pl-10 bg-[#0d1321] rounded-md border border-gray-700 text-white focus:outline-none focus:border-yellow-400 transition-all duration-300"
            {...register("phoneNo", {
              required: "Please enter your phone number.",
              minLength: { value: 10, message: "Invalid phone number" },
              maxLength: { value: 12, message: "Invalid phone number" },
            })}
          />
          {/* <FiPhone className="absolute left-3 top-4 text-gray-400" /> */}
        </div>
      </div>
      {errors.phoneNo && (
        <span className="text-yellow-300 text-xs">
          {errors.phoneNo.message}
        </span>
      )}
    </div>

    {/* Message */}
    <div className="flex flex-col gap-2">
      <label htmlFor="message" className="text-sm flex items-center gap-1">
        <FiMessageCircle /> Message
      </label>
      <div className="relative">
        <textarea
          id="message"
          rows="5"
          placeholder="Enter your message here"
          className="w-full p-3 pl-10 bg-[#0d1321] rounded-md border border-gray-700 text-white focus:outline-none focus:border-yellow-400 transition-all duration-300 resize-none"
          {...register("message", { required: true })}
        />
        {/* <FiMessageCircle className="absolute left-3 top-4 text-gray-400" /> */}
      </div>
      {errors.message && (
        <span className="text-yellow-300 text-xs">
          Please enter your message.
        </span>
      )}
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      className="flex items-center justify-center gap-2 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-md shadow-md hover:bg-yellow-300 transition-all duration-300"
      disabled={loading}
    >
      <BiSend /> {loading ? "Sending..." : "Send Message"}
    </button>
  </form>
  )
}

export default ContactUsForm