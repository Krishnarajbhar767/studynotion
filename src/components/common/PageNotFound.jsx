import React from "react";
import { Link } from "react-router-dom";
import { FaRegSadCry } from "react-icons/fa";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-richblack-900 text-white text-center px-4">
      <div className="flex flex-col items-center">
        <FaRegSadCry className="text-yellow-50 text-[100px] mb-6" />
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg text-richblack-300 mb-8">
          Oops! The page you're looking for doesn't exist. It might have been
          moved or deleted.
        </p>
        {/* <img
          src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg" // Replace with your image URL
          alt="Not Found"
          className="w-full max-w-md mb-8"
        /> */}
        <Link
          to="/"
          className="bg-yellow-50 text-richblack-900 px-6 py-3 rounded-lg font-semibold text-lg hover:scale-105 transform transition-all duration-200"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
