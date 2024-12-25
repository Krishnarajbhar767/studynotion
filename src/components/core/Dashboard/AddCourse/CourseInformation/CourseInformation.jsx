import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import RequirementField from "./RequirementField";
import { setCourse, setStep } from "../../../../../redux/slices/courseSlice";
import { addCourseDetails } from "../../../../../services/opration/courseDetailsApi";
import toast from "react-hot-toast";

function CourseInformation() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { course, editCourse } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState(
    JSON.parse(localStorage.getItem("categories"))
  );
  useEffect(() => {
    if (editCourse) {
      setValue("courseTitle", course.name);
      setValue("coursePrice", course.price);
      setValue("courseCategory", course.category);
      setValue("courseBenifits", course.whatYouWillLearn);
      setValue("courseRequirement", course.instructions);
      setValue("courseImage", course.thubmnail);
      setValue("courseTitle", course.name);
    }
  }, []);
  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      // currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseRequirements.toString() !==
        course.instructions.toString() ||
      currentValues.courseImage !== course.thumbnail
    ) {
      return true
    }
    return false
  }

  // create a new course 

  const formData  = new FormData();

  // Handler Next Button Click
  const onSubmit = async (data) => {
    console.log(data)

    if (editCourse) {
      // const currentValues = getValues()
      // console.log("changes after editing form values:", currentValues)
      // console.log("now course:", course)
      // console.log("Has Form Changed:", isFormUpdated())
      if (isFormUpdated()) {
        const currentValues = getValues()
        const formData = new FormData()
        // console.log(data)
        formData.append("courseId", course._id)
        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle)
        }
        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc)
        }
        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice)
        }
   
        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits)
        }
        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory)
        }
        if (
          currentValues.courseRequirements.toString() !==
          course.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirements)
          )
        }
        if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnailImage", data.courseImage)
        }
        // console.log("Edit Form data: ", formData)
        setLoading(true)
        const result = await editCourseDetails(formData, token)
        setLoading(false)
        if (result) {
          dispatch(setStep(2))
          dispatch(setCourse(result))
        }
      } else {
        toast.error("No changes made to the form")
      }
      return
    }

    const formData = new FormData()
    formData.append("courseName", data.courseTitle)
    formData.append("courseDescription", data.courseShortDesc)
    formData.append("price", data.coursePrice)
    formData.append("tag", JSON.stringify(data.courseTags))
    formData.append("whatYouWillLearn", data.courseBenefits)
    formData.append("category", data.courseCategory)
    formData.append("status", "Draft")
    formData.append("instructions", JSON.stringify(data.courseRequirements))
    formData.append("thumbnailImage", data.courseImage)
    setLoading(true)
    const result = await addCourseDetails(formData, token);
    if (result.success) {
      console.log(result)
      dispatch(setStep(2))
      dispatch(setCourse(result))
    }
    setLoading(false)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      class="space-y-8 rounded-md border border-richblack-700 bg-richblack-800 p-6 shadow-lg"
    >
      {/* <!-- Course Title --> */}
      <div class="flex flex-col space-y-2">
        <label
          class="text-sm font-medium text-richblack-5"
          htmlFor="courseTitle"
        >
          Course Title <sup class="text-pink-200">*</sup>
        </label>
        <input
          id="courseTitle"
          placeholder="Enter Course Title"
          class="w-full rounded-md border border-richblack-600 bg-richblack-700 px-4 py-2 text-richblack-5 focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
          {...register("courseTitle", { required: true })}
        />
        {errors.courseTitle && (
          <span class="ml-2 text-xs tracking-wide text-pink-200">
            Course title is required
          </span>
        )}
      </div>

      {/* <!-- Course Short Description --> */}
      <div class="flex flex-col space-y-2">
        <label
          class="text-sm font-medium text-richblack-5"
          htmlFor="courseShortDesc"
        >
          Course Short Description <sup class="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseShortDesc"
          placeholder="Enter Description"
          class="min-h-[130px] w-full rounded-md border border-richblack-600 bg-richblack-700 px-4 py-2 text-richblack-5 focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
          {...register("courseShortDesc", { required: true })}
        ></textarea>
        {errors.courseShortDesc && (
          <span class="ml-2 text-xs tracking-wide text-pink-200">
            Course Description is required
          </span>
        )}
      </div>

      {/* <!-- Course Price --> */}
      <div class="flex flex-col space-y-2">
        <label
          class="text-sm font-medium text-richblack-5"
          htmlFor="coursePrice"
        >
          Course Price <sup class="text-pink-200">*</sup>
        </label>
        <div class="relative">
          <input
            id="coursePrice"
            placeholder="Enter Course Price"
            class="w-full rounded-md border border-richblack-600 bg-richblack-700 pl-12 pr-4 py-2 text-richblack-5 focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
            {...register("coursePrice", { required: true })}
          />
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-2xl text-richblack-400">
            ₹
          </span>
        </div>
        {errors.coursePrice && (
          <span class="ml-2 text-xs tracking-wide text-pink-200">
            Course Price is required
          </span>
        )}
      </div>

      {/* <!-- Course Category --> */}
      <div class="flex flex-col space-y-2">
        <label
          class="text-sm font-medium text-richblack-5"
          htmlFor="courseCategory"
        >
          Course Category <sup class="text-pink-200">*</sup>
        </label>
        <select
          id="courseCategory"
          class="w-full rounded-md border border-richblack-600 bg-richblack-700 px-4 py-2 text-richblack-5 focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
          {...register("courseCategory", { required: true })}
        >
          <option value="" disabled selected>
            Choose a Category
          </option>
          {courseCategories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
        {errors.courseCategory && (
          <span class="ml-2 text-xs tracking-wide text-pink-200">
            Course Category is required
          </span>
        )}
      </div>

      {/* <!-- Course Thumbnail --> */}
      <div class="flex flex-col space-y-2">
        <label class="text-sm font-medium text-richblack-5">
          Course Thumbnail
        </label>
        <input
          type="file"
          class="w-full rounded-md border border-richblack-600 bg-richblack-700 px-4 py-2 text-richblack-5 focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
          {...register("file", { required: true })}
        />
        {errors.file && (
          <span class="ml-2 text-xs tracking-wide text-pink-200">
            Thumbnail is required
          </span>
        )}
      </div>

      {/* <!-- Benefits of the Course --> */}
      <div class="flex flex-col space-y-2">
        <label
          class="text-sm font-medium text-richblack-5"
          htmlFor="courseBenefits"
        >
          Benefits of the Course <sup class="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseBenefits"
          placeholder="Enter benefits of the course"
          class="min-h-[130px] w-full rounded-md border border-richblack-600 bg-richblack-700 px-4 py-2 text-richblack-5 focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
          {...register("courseBenefits", { required: true })}
        ></textarea>
        {errors.courseBenefits && (
          <span class="ml-2 text-xs tracking-wide text-pink-200">
            Benefits of the course is required
          </span>
        )}
      </div>

      {/* <!-- Requirements/Instructions --> */}
      <RequirementField
        register={register}
        errors={errors}
        name={"Requirements"}
        label={"Requirements"}
        setValue={setValue}
        getValues={getValues}
      />

      {/* <!-- Buttons --> */}
    
        <div class="flex justify-end gap-x-2">
    {
      editCourse && (      <button
        onClick={() => dispatch(setStep(2))}
        type="button"
        class="flex items-center gap-x-2 rounded-md bg-richblack-600 px-4 py-2 text-sm font-semibold text-richblack-100 hover:bg-richblack-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
      >
        Continue Without Saving
      </button>)
    }
        {
          !editCourse && (
            <button
            type="submit"
            class="rounded-md bg-yellow-50 px-4 py-2 text-sm font-medium text-richblack-900 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            {!editCourse ? "Next" : "Save Changes"}
          </button>
          )
        }
        </div>
   
    </form>
  );
}

export default CourseInformation;
