import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getResetToken } from "../../services/opration/authApi";

function ForgotPassword() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");

  const handleOnSubmit = (event) => {
    event.preventDefault();
    dispatch(getResetToken(email, setEmailSent));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      {loading ? (
        <div className="loader"></div>
      ) : (
        <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center mb-4">
            {!emailSent ? "Reset Your Password" : "Check Your Email"}
          </h1>
          <p className="text-gray-400 text-center mb-6">
            {!emailSent
              ? "Have no fear. We'll email you instructions to reset your password. If you don’t have access to your email, we can try account recovery."
              : `We have sent the reset email to ${email}`}
          </p>
          <form onSubmit={handleOnSubmit} className="space-y-4">
            {!emailSent && (
              <label className="block">
                <p className="text-sm font-medium mb-2">Email Address</p>
                <input
                  type="email"
                  required
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </label>
            )}
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {!emailSent ? "Reset Password" : "Resend Email"}
            </button>
          </form>
          <div className="text-center mt-4">
            <Link to="/login" className="text-blue-400 hover:underline">
              Back To Login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;
