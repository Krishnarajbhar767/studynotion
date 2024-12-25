import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  step: 1,
  categories:localStorage.getItem("categories") ? JSON.parse(localStorage.getItem("categories")) :[],
  course: null,
  editCourse: false,
  paymentLoading: false,
}

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload
    },
    setCourse: (state, action) => {
      state.course = action.payload
    },
    setEditCourse: (state, action) => {
      state.editCourse = action.payload
    },
    setPaymentLoading: (state, action) => {
      state.paymentLoading = action.payload
    },
    resetCourseState: (state) => {
      state.step = 1
      state.course = null
      state.editCourse = false
    },
    setCategories(state,value){
      console.log("Getting Data",value)
      state.categories = value.payload
    }
  },
})

export const {
  setStep,
  setCourse,
  setCategories,
  setEditCourse,
  setPaymentLoading,
  resetCourseState,
} = courseSlice.actions

export default courseSlice.reducer