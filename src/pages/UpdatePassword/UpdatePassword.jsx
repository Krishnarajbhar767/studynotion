import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { resetPassword } from "../../services/opration/authApi";

export default function UpdatePassword() {

  const dispatch = useDispatch();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { loading } = useSelector((state) => state.auth);
  const {error} = useSelector((state)=> state.auth);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  function handleOnChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    const { password, confirmPassword } = formData;
    const resetToken = location.pathname.split("/").at(-1);
    dispatch(resetPassword(password, confirmPassword, resetToken));
    if (!error) {
      setFormData({
        confirmPassword:"",
        password:""
      }) 
    }

    (error)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      {loading ? (
        <div className="loader"></div>
      ) : (
        <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center mb-4">Choose New Password</h1>
          <p className="text-gray-400 text-center mb-6">
            Almost done. Enter your new password and you're all set.
          </p>
          <form onSubmit={handleOnSubmit} className="space-y-4">
            <label className="block">
              <p className="text-sm font-medium mb-2">New Password</p>
              <div className="relative">
                <input
                  onChange={handleOnChange}
                  value={formData.password}
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="New Password"
                  name="password"
                  className="w-full px-4 py-2 bg-gray-700 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-black hover:text-black"
                >
                  {showPassword ? <IoMdEye fontSize={24} /> : <IoMdEyeOff fontSize={24} />}
                </span>
              </div>
            </label>
            <label className="block">
              <p className="text-sm font-medium mb-2">Confirm Password</p>
              <div className="relative">
                <input 
                  onChange={handleOnChange}
                  value={formData.confirmPassword}
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  className="w-full px-4 py-2 bg-gray-700 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-black hover:text-black"
                >
                  {showConfirmPassword ? <IoMdEye fontSize={24} /> : <IoMdEyeOff fontSize={24} />}
                </span>
              </div>
            </label>
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Reset Password
            </button>
            <div className="text-center mt-4">
              <Link to="/login" className="text-blue-400 hover:underline">
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
