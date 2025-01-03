import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Signup from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import OpenRoute from "./components/core/Auth/OpenRoute";
import UpdatePassword from "./pages/UpdatePassword/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail/VerifyEmail";
import About from "./pages/About/About";
import MyProfile from "./components/core/Dashboard/MyProfile";
import ProtectedRoute from "./components/core/Auth/ProtectedRoute";
import PageNotFound from "./components/common/PageNotFound";
import Dashboard from "./pages/Dashboard/Dashboard";
import Settings from "./components/core/Dashboard/Settings/Settings";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart";
import { useSelector } from "react-redux";
import { Instructor, Student } from "../constant";
import AddCourse from "./components/core/Dashboard/AddCourse/Index";
function App() {
  const {user} = useSelector((state)=>state.profile)
  return (
    <div className=" min-h-screen w-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar/>
      <Routes>
         <Route path="/" element={<Home/>}>
        </Route>
      <Route path="/signup" element={<OpenRoute><Signup/></OpenRoute>}></Route>
      <Route path="/login" element={<OpenRoute><Login/></OpenRoute>}></Route>
      <Route path="/forgot-password" element={<OpenRoute><ForgotPassword/></OpenRoute>}></Route>
      <Route path="/update-password/:id" element={<OpenRoute><UpdatePassword/></OpenRoute>}/>
      <Route path="/verify-email" element={<OpenRoute><VerifyEmail/></OpenRoute>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="*" element={<PageNotFound/>}></Route>
      <Route 
      element={<ProtectedRoute><Dashboard/></ProtectedRoute>}
      >
      <Route path="/dashboard/my-profile" element={<ProtectedRoute><MyProfile/></ProtectedRoute>}></Route>
      <Route path="/dashboard/settings" element={<ProtectedRoute><Settings/></ProtectedRoute>}></Route>
      {
        user?.accountType === Student && (
          <>
                <Route path="/dashboard/enrolled-courses" element={<ProtectedRoute><EnrolledCourses/></ProtectedRoute>}></Route>
                <Route path="/dashboard/cart" element={<ProtectedRoute><Cart/></ProtectedRoute>}/>
          </>
        )
      }
            {
        user?.accountType === Instructor && (
          <>
                <Route path="/dashboard/add-course" element={<ProtectedRoute><AddCourse/></ProtectedRoute>}></Route>
          </>
        )
      }
      </Route>
      <Route
      element={<ProtectedRoute><Dashboard/></ProtectedRoute>}
      >
     
      </Route>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
