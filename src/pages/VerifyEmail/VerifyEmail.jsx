import React, { useState } from "react";
import OTPInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { AiOutlineMail } from "react-icons/ai";
import { sendOtp, signUp } from "../../services/opration/authApi";
import { useEffect } from "react";
import toast from "react-hot-toast";
function VerifyEmail() {
  const { loading, signupData } = useSelector((state) => state.auth);
  (signupData)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const { accountType, firstName, lastName, email, password, confirmPassword } =
  signupData;
  const handleOnSubmit = (e) => {
    e.preventDefault();

    dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword,navigate,otp));
  };

  useEffect(() => {
        if (!signupData) {
                navigate("/signup");
        }
  }, [])
  
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#000814" }}
    >
      {loading ? (
        <div className="loader">
        </div>
      ) : (
        <div className="w-full max-w-md bg-[#001D3D] p-8 rounded-lg shadow-lg text-white">
          <h1 className="text-2xl font-bold text-center mb-4 flex items-center justify-center gap-2">
            <AiOutlineMail size={28} />
            Verify Email
          </h1>
          <p className="text-gray-300 text-center mb-6">
            A verification code has been sent to your email. Please enter the
            code below.
          </p>
          <form
            onSubmit={handleOnSubmit}
            action="submit"
            className="flex flex-col items-center space-y-6"
          >
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  className="h-12 w-12 text-4xl font-normal  bg-[#003566] text-white text-center  rounded-md border border-gray-600 focus:ring-2 focus:ring-yellow-400 focus:outline-none flex items-center justify-center"
                />
              )}
              containerStyle={{
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
              }}
            />
            <button
              type="submit"
              className="w-full bg-yellow-400 text-black font-medium py-2 rounded-md hover:bg-yellow-300 transition duration-200"
            >
              Verify Email
            </button>
          </form>
          <div className="mt-6 flex justify-between items-center">
            <Link
              to="/login"
              className="text-sm text-gray-300 hover:text-blue-200 flex items-center gap-2 "
            >
              <BiArrowBack size={20} />
              Back to Login
            </Link>
            <button
              className="flex items-center text-sm text-gray-300 hover:text-blue-200 gap-2 transition duration-200"
              onClick={() => {
                dispatch(sendOtp(email,navigate))
              }}
            >
              <RxCountdownTimer size={20} />
              Resend Code
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerifyEmail;
