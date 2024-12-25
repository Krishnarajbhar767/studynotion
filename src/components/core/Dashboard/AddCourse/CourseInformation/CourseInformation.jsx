// Import necessary modules and components
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form"; // Provides form handling functionality
import { useDispatch, useSelector } from "react-redux"; // For Redux state management
import RequirementField from "./RequirementField"; // Custom component for handling course requirements
import { setCourse, setStep } from "../../../../../redux/slices/courseSlice"; // Redux actions
import { addCourseDetails } from "../../../../../services/opration/courseDetailsApi"; // API service for course details
import toast from "react-hot-toast"; // For user notifications

function CourseInformation() {
  // React Hook Form setup for managing form state
  const {
    register, // Used to register input fields
    handleSubmit, // Used to handle form submission
    setValue, // Used to set form field values dynamically
    getValues, // Used to get current form field values
    formState: { errors }, // Tracks validation errors
  } = useForm();

  // Redux hooks to access and dispatch state
  const dispatch = useDispatch();
  const { course, editCourse } = useSelector((state) => state.course); // Accessing course-related state
  const { token } = useSelector((state) => state.auth); // Accessing user authentication token

  // Local state variables
  const [loading, setLoading] = useState(false); // Loading indicator for API calls
  const [courseCategories, setCourseCategories] = useState(
    JSON.parse(localStorage.getItem("categories")) // Retrieve course categories from local storage
  );

  // Pre-populate form fields if editing an existing course
  useEffect(() => {
    if (editCourse) {
      setValue("courseTitle", course.courseName);
      setValue("coursePrice", course.price);
      setValue("courseCategory", course.category);
      setValue("courseBenifits", course.whatYouWillLearn);
      setValue("courseRequirement", course.instructions);
      setValue("courseImage", course.thumbnail);
    }
  }, [editCourse, course, setValue]);

  // Check if any form fields have been updated
  const isFormUpdated = () => {
    const currentValues = getValues();
    return (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.requirements.toString() !==
        course.instructions.toString() ||
      currentValues.courseImage !== course.thumbnail
    );
  };

  // Form submission handler
  const onSubmit = async (data) => {
    console.log("Printing Course 1 JSX--->", data);
    if (editCourse) {
      // Handle course updates
      if (isFormUpdated()) {
        const formData = new FormData(); // Create a new FormData object for API submission
        formData.append("courseId", course._id);

        // Append only the updated fields
        if (data.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle);
        }
        if (data.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc);
        }
        if (data.coursePrice !== course.price) {
          formData.append("price", data.coursePrice);
        }
        if (data.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits);
        }
        if (data.courseCategory !== course.category) {
          formData.append("category", data.courseCategory);
        }
        if (
          data.requirements.toString() !== course.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.requirements)
          );
        }
        if (data.courseImage !== course.thumbnail) {
          formData.append("thumbnailImage", data.courseImage);
        }

        setLoading(true); // Show loading indicator
        const result = await editCourseDetails(formData, token); // API call to update the course
        setLoading(false);

        if (result) {
          dispatch(setStep(2)); // Move to the next step in the form process
          dispatch(setCourse(result)); // Update the course state in Redux
        }
      } else {
        toast.error("No changes made to the form"); // Notify user if no updates are detected
      }
      return;
    } else {
      // Handle creating a new course
      const formData = new FormData();
      formData.append("courseName", data.courseTitle);
      formData.append("courseDescription", data.courseShortDesc);
      formData.append("price", data.coursePrice);
      // formData.append("tag", JSON.stringify(data.courseTags));
      formData.append("whatYouWillLearn", data.courseBenefits);
      formData.append("category", data.courseCategory);
      formData.append("status", "Draft");
      formData.append("instructions", JSON.stringify(data.requirements));
      formData.append("thumbnailImage", data.courseImage[0]);
      setLoading(true);
      for (let [key, value] of formData.entries()) {
        console.log("Krishna",formData)
        console.log(`${key}:`, value);
      }

      const toastId = toast.loading("Please Wait...")
      const result = await addCourseDetails(formData, token); // API call to add a new course
      if (result) {
        
        dispatch(setStep(2)); // Move to the next step
        dispatch(setCourse(result)); // Update the Redux state with new course data
        toast.dismiss(toastId)
        toast.success("Course Created Successfully.")
      }
      setLoading(false)
    }
  };

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
        <label
          class="text-sm font-medium text-richblack-5"
          htmlFor="courseImage"
        >
          Course Thumbnail
        </label>
        <input
          id="courseImage"
          name="courseImage"
          type="file"
          class="w-full rounded-md border border-richblack-600 bg-richblack-700 px-4 py-2 text-richblack-5 focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
          {...register("courseImage", { required: true })}
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
        name={"requirements"}
        label={"requirements"}
        setValue={setValue}
        getValues={getValues}
      />

      {/* <!-- Buttons --> */}

      <div class="flex justify-end gap-x-2">
        {editCourse && (
          <button
            onClick={() => dispatch(setStep(2))}
            type="button"
            class="flex items-center gap-x-2 rounded-md bg-richblack-600 px-4 py-2 text-sm font-semibold text-richblack-100 hover:bg-richblack-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            Continue Without Saving
          </button>
        )}
        {!editCourse && (
          <button
            type="submit"
            class="rounded-md bg-yellow-50 px-4 py-2 text-sm font-medium text-richblack-900 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            {!editCourse ? "Next" : "Save Changes"}
          </button>
        )}
      </div>
    </form>
  );
}

export default CourseInformation;
