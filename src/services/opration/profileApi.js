import toast from "react-hot-toast";
import { setLoading } from "../../redux/slices/profileSlice";
import { apiConncetor } from "../apiConnector";
import { COURSES_APIS } from "../apis";

export async function getUserEnrolledCourses(token) {
  const headers = {
    Authorization: `Bearer ${token}`, // Add the token
    'Content-Type': 'application/json', // Ensure the correct content type
  }

  try {
    const response = await apiConncetor("GET",COURSES_APIS.GET_USER_ENROLLED_COURSES,{token},headers);
    console.log("Printing response",response)
    if (!response.data.success) throw new Error("Error fetching courses.");
    return response.data
  } catch (error) {
    throw error;
  }
}

