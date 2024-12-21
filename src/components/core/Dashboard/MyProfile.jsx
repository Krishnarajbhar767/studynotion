import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconButton from "../../common/IconButton";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { BsGenderAmbiguous } from "react-icons/bs";
import { MdOutlinePhone, MdCake } from "react-icons/md";

function MyProfile() {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen bg-richblack-900 text-white px-5 py-10 md:px-10">
      {/* Header */}
      <h1 className="text-3xl font-bold border-b border-richblack-700 pb-4 mb-8">
        My Profile
      </h1>

      {/* Section 1: Profile Info */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-5">
          <img
            src={user?.avtar}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-20 h-20 rounded-full object-cover border-2 border-yellow-500"
          />
          <div>
            <p className="text-xl font-semibold">{`${user?.firstName} ${user?.lastName}`}</p>
            <p className="text-richblack-300 flex items-center gap-2">
              <HiOutlineMail /> {user?.email}
            </p>
          </div>
        </div>
        <button
  onClick={() => navigate("/dashboard/settings")}
  className="bg-yellow-500 text-black px-3 py-1 rounded-md font-semibold hover:bg-yellow-400 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
>
  <FaEdit className="text-black" /> Edit Profile
</button>
      </div>

      {/* Section 2: About */}
      <div className="bg-richblack-800 p-6 rounded-lg shadow-md mb-8">
        <div className="flex items-center justify-between mb-4">
          <p className="text-lg font-semibold">About</p>
          <button
  onClick={() => navigate("/dashboard/settings")}
  className="bg-yellow-500 text-black px-3 py-1 rounded-md font-semibold hover:bg-yellow-400 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
>
  <FaEdit className="text-black" /> Edit
</button>
        </div>
        <p className="text-richblack-300">
          {user?.additionalDetails?.about ?? "Write something about yourself."}
        </p>
      </div>

      {/* Section 3: Personal Details */}
      <div className="bg-richblack-800 p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <p className="text-lg font-semibold">Personal Details</p>
          <button
  onClick={() => navigate("/dashboard/settings")}
  className="bg-yellow-500 text-black px-3 py-1 rounded-md font-semibold hover:bg-yellow-400 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
>
  <FaEdit className="text-black" /> Edit
</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* First Name */}
          <div className="flex items-center gap-3">
            <FiUser className="text-yellow-500 text-xl" />
            <div>
              <p className="text-richblack-300">First Name</p>
              <p>{user?.firstName}</p>
            </div>
          </div>

          {/* Last Name */}
          <div className="flex items-center gap-3">
            <FiUser className="text-yellow-500 text-xl" />
            <div>
              <p className="text-richblack-300">Last Name</p>
              <p>{user?.lastName}</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-3">
            <HiOutlineMail className="text-yellow-500 text-xl" />
            <div>
              <p className="text-richblack-300">Email</p>
              <p>{user?.email}</p>
            </div>
          </div>

          {/* Gender */}
          <div className="flex items-center gap-3">
            <BsGenderAmbiguous className="text-yellow-500 text-xl" />
            <div>
              <p className="text-richblack-300">Gender</p>
              <p>{user?.additionalDetails?.gender ?? "Add Your Gender"}</p>
            </div>
          </div>

          {/* Phone Number */}
          <div className="flex items-center gap-3">
            <MdOutlinePhone className="text-yellow-500 text-xl" />
            <div>
              <p className="text-richblack-300">Phone Number</p>
              <p>
                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
              </p>
            </div>
          </div>

          {/* Date of Birth */}
          <div className="flex items-center gap-3">
            <MdCake className="text-yellow-500 text-xl" />
            <div>
              <p className="text-richblack-300">Date of Birth</p>
              <p>{user?.additionalDetails?.dateOfBirth ?? "Add Date Of Birth"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;