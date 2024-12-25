const BASE_URL = "http://localhost:3000/api/v1";

export const CATEGORIES = {
  SHOW_ALL_CATEGORIES: BASE_URL + "/course/showAllCategories",
};

export const AUTHAPIS = {
  RESETPSWTKN: BASE_URL + "/auth/reset-password-token",
  RESET_PASSWORD: BASE_URL + "/auth/reset-password",

  SEND_OTP: BASE_URL + "/auth/sendotp",
  SIGN_UP: BASE_URL + "/auth/signup",
  LOG_IN: BASE_URL + "/auth/login",
};

export const contactusEndpoint = {
  CONTACT_US_API: BASE_URL + "/reach/contactus",
};

export const SETTINGS_APIS = {
  CHANGE_PASSWORD: BASE_URL + "/auth/change-password",
};

export const COURSES_APIS = {
        GET_USER_ENROLLED_COURSES:BASE_URL+"/profile/get-enrolled-courses", 
        CREATE_COURSE:BASE_URL+"/course/create-course"  
}