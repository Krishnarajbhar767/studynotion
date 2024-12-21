import React from "react";
import { Link } from "react-router-dom";

function Button({ children, active, linkto }) {
  return (
    <Link to={linkto}>
      <div id="CTAButton"
        className={`inline-block  text-center  font-bold px-7 py-3  ${
          active
            ? "bg-yellow-100 text-richblack-900"
            : "bg-richblack-800 text-white"
        } hover:scale-95  hover:shadow-none transition-all duration-200 rounded-md`}
      >
        {children}
      </div>
    </Link>
  );
}

export default Button;
