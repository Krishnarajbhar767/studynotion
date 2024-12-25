import React, { useState, useEffect } from "react";

function RequirementField({
  name,
  label,
  getValues,
  setValue,
  errors,
  register,
}) {
  const [requirement, setRequirement] = useState("");
  const [requirementList, setRequirementList] = useState([]);

  const addRequirement = () => {
    if (requirement.trim()) {
      setRequirementList((prev) => [...prev, requirement.trim()]);
      setRequirement("");
      setValue(name, [...requirementList, requirement.trim()]);
    }
  };

  const removeRequirement = (idx) => {
    const updatedRequirementList = [...requirementList];
    updatedRequirementList.splice(idx, 1);
    setRequirementList(updatedRequirementList);
    setValue(name, updatedRequirementList);
  };

  useEffect(() => {
    register(name, { required: true });
    
  }, [name, register]);

  return (
    <div className="space-y-4">
      {/* Input Field */}
      <div className="flex flex-col space-y-2">
        <label htmlFor={name} className="text-sm font-medium text-richblack-5">
          {label} <sup className="text-pink-200">*</sup>
        </label>
        <div className="flex items-center space-x-2">
          <input
            id={name}
            placeholder="Enter requirements"
            value={requirement}
            onChange={(e) => setRequirement(e.target.value)}
            onKeyDown={(e)=>{
              
              if (e.key === "Enter") {
                e.preventDefault(); // Prevent form submission
                addRequirement();}


            }}
            className="w-full rounded-md border border-richblack-600 bg-richblack-700 px-4 py-2 text-richblack-5 focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
          />
          <button
            type="button"
            onClick={addRequirement}
            className="rounded-md bg-yellow-50 px-4 py-2 text-sm font-medium text-richblack-900 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            Add
          </button>
        </div>
        {errors[name] && (
          <span className="text-xs tracking-wide text-pink-200">
            {label} is required
          </span>
        )}
      </div>

      {/* Requirement List */}
      {requirementList.length > 0 && (
        <ul className="space-y-2">
          {requirementList.map((req, idx) => (
            <li
              key={idx}
              className="flex items-center justify-between rounded-md bg-richblack-700 p-2 text-sm text-richblack-5"
            >
              <span>{req}</span>
              <button
                type="button"
                onClick={() => removeRequirement(idx)}
                className="text-xs font-medium text-pink-300 hover:text-pink-500"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RequirementField;
