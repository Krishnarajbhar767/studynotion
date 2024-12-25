import { apiConncetor } from "../apiConnector"
import { CATEGORIES, COURSES_APIS } from "../apis"
import toast from "react-hot-toast"
export const fetchCourseCategories = async (token) => {
  const headers = {
    Authorization: `Bearer ${token}`, // Add the token
    'Content-Type': 'application/json', // Ensure the correct content type
  }
        let result = []
        try {
          const response = await apiConnector("GET", CATEGORIES.SHOW_ALL_CATEGORIES,token,headers);
          console.log("COURSE_CATEGORIES_API API RESPONSE............", response)
          if (!response?.data?.success) {
            throw new Error("Could Not Fetch Course Categories")
          }
          result = response?.data?.data
        } catch (error) {
          console.log("COURSE_CATEGORY_API API ERROR............", error)
          toast.error(error.message)
        }
        return result
      }




      export const addCourseDetails = async (bodyData,token) => {
        const headers = {
          Authorization: `Bearer ${token}`, // Add the token
          'Content-Type': 'application/json', // Ensure the correct content type
        }
              let result = []
              try {
                const response = await apiConncetor("POST", COURSES_APIS.CREATE_COURSE,bodyData,headers);
                console.log("COURSE_CREATION API RESPONSE............", response)
                if (!response?.data?.success) {
                  throw new Error("Could Not CREATE COURSE")
                }
                result = response?.data?.data
              } catch (error) {
                console.log("COURSE_CREATION_API API ERROR............", error)
                toast.error(error.message)
              }
              return result
            }