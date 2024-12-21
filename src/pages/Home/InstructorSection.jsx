import React from 'react'
import InstructorImg from "/src/Images/Instructor.png"
import HightLightText from './HightLightText'
import CTAButton from "./Button"
import { FaArrowRight } from 'react-icons/fa'
import ReviewSlider from '../../components/common/ReviewSlider'
export default function InstructorSection() {
  return (
        <div className="w-screen bg-richblack-900 py-16">
        <div className="w-11/12 max-w-maxContent mx-auto flex items-center justify-start gap-16">
                          <div className="w-1/2">
                            <img src={InstructorImg} className="w-full h-full object-cover scale-95 instructor_shadow"/>
                          </div>
                          <div className="w-1/2 ">
                            <h1 className="text-4xl mb-4 text-white font-semibold">Become an <br /> <HightLightText text={"instructor"}/></h1>
                            <p className="text-richblack-100 my-8">Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
                            <CTAButton  active={true}><div className="flex gap-3 items-center ">
                              Start teaching today <FaArrowRight/>
                              </div></CTAButton>
                          </div>
                        </div>
                          <h1 className="text-center text-white text-4xl font-medium mt-16">Review from other learner</h1>
                          <ReviewSlider/>  
        </div>   
  )
}
