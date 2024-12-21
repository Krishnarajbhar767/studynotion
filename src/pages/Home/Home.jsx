import React from "react";
import { FaArrowRight } from "react-icons/fa";
import HightLightText from "../Home/HightLightText.jsx";
import { Link } from "react-router-dom";
import CTAButton from "../Home/Button.jsx";
import BannerVideo from "/src/assets/Images/banner.mp4";
import CodeBlock from "../Home/CodeBlock.jsx";
import timeLineImages from "/src/assets/Images/TimelineImage.png"
import Logo1 from  "/src/assets/TimeLineLogo/Logo1.svg"
import Logo2 from  "/src/assets/TimeLineLogo/Logo2.svg"
import Logo3 from  "/src/assets/TimeLineLogo/Logo3.svg"
import Logo4 from  "/src/assets/TimeLineLogo/Logo4.svg"
import KnowOtherImg from "/src/Images/Know_your_progress.png"
import CompareWithOtherImg from "/src/Images/Compare_with_others.png"
import PlanYourLessionImg from "/src/Images/Plan_your_lessons.png"
import ReviewSlider from "../../components/common/ReviewSlider.jsx";
import Footer from "../../components/common/Footer.jsx";
import InstructorSection from "./InstructorSection.jsx";
import ExploreMore from "./ExploreMore.jsx";
import CourseCard from "./CourseCard.jsx";
function Home() {

  return (
    <div>
      {/* Section 1 */}
      <div
        className=" relative mx-auto flex flex-col w-11/12 max-w-maxContent
       items-center text-white justify-between border-white"
      >
        {/* Become an intructor Button  */}
        <Link to={"/signup"}>
          <div 
          id="becomeInstructor_Button"
          className="mx-auto rounded-full bg-richblack-800 text-richblack-100 transition-all duration-200  flex flex-row w-fit px-16 py-3 justify-between items-center gap-4 text-md font-semibold mt-10 hover:bg-richblack-900 hover:border-[2px] hover:border-solid hover:border-richblack-100 hover:scale-[0.9]">
            <p>Become an intructor</p>
            <FaArrowRight />
          </div>
        </Link>
        <div className=" text-center text-4xl font-semibold mt-6">
          Empower Your Future With
          <HightLightText text={"Coding Skills"} />
        </div>

        <div className="text-center w-[90%] text-lg font-bold text-richblack-300 mt-4">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        <div buttonContainer className="flex flex-row gap-7 mt-4">
          <CTAButton children={"Learn More"} active={true} linkto={"/signup"} />
          <CTAButton children={"Book Demo"} active={false} linkto={"/login"} />
        </div>
        {/* banner video section  */}
        <div className="video_shadow  mx-3 my-20 shadow-white">
          <video src={BannerVideo} muted loop autoPlay></video>
        </div>

        {/* Explore More Section */}
        
          {/* CodeBlock Section 1 */}
          <div>
            <CodeBlock
              position={"flex-row"}
              heading={
                <div className="text-4xl font-semibold">Unlock your 
                  <HightLightText text={"Coding potential"}/>
                   with our online courses.</div>
              }
              subHeading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
              ctabtn1={{btnText:"try it yourself",linkto:"/signup",active:true}}
              ctabtn2={{btnText:"learn more",linkto:"/login",active:false}}
              codeblock={`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React</title>
  </head>
  <body>
`}
codeColor={"text-yellow-25"}
            />
            
          </div>
          {/* CodeBlock Section 2 */}
          <div>
            <CodeBlock
              reverse={true}
              position={"lg:flex-row-reverse"}
              heading={
                <div className="text-4xl font-semibold">Unlock your 
                  <HightLightText text={"Coding potential"}/>
                   with our online courses.</div>
              }
              subHeading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
              ctabtn1={{btnText:"try it yourself",linkto:"/signup",active:true}}
              ctabtn2={{btnText:"learn more",linkto:"/login",active:false}}
              codeblock={`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React</title>
  </head>
  <body>
`}
codeColor={"text-yellow-25"}
            />
            
          </div>
      </div>
      <ExploreMore/>
      {/* Section 2 */}
      <div className="bg-pure-greys-5 text-richblack-700 pt-10"> 
                <div className="homepage_bg h-[300px]">
                <div className="max-w-maxContent w-11/12 flex flex-col items-center mx-auto gap-5"> 
                <div className="h-[250px] flex items-center">
                <div className="flex flex-row gap-7 text-white">
                <CTAButton active={true} linkto={"/signup"}>
                  <div className="flex gap-5 items-center">
                    Explore Full Catlog 
                  <FaArrowRight/> 
                  </div>
                </CTAButton>
                <CTAButton>
                  <div>
                    Learn more
                  </div>
                </CTAButton>
                </div>
                </div>
                </div>
                </div>

                {/* new section start */}
       
                <div className="mx-auto pt-4  flex justify-center  gap-10 items-start w-11/12 max-w-maxContent">
                    
                  {/* highlighted text part */}
                  <div className=" text-4xl font-inter font-bold max-w-[50%]">
                  Get the skills you need for a 
                <HightLightText text={"job that is in demand"} />
                  .  
                  </div>
                  {/*button and text  */}
                  <div className="max-w-[50%] flex flex-col gap-8">
                    <p className="text-xl text-richblack-800 font-medium">The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
                    <CTAButton children={"Learn more"} linkto={"/signup"} active={true}/>
                  </div>
                </div>

                {/* Learn Section Start */}

                <div className=" mt-16  w-11/12 max-w-maxContent mx-auto flex justify-between py-10">
                  <div className="max-w-[50%] flex flex-col justify-between">
                  <div className="flex gap-10 timelineContainer">
                  
                      <div className="h-16 w-16 rounded-full shadow-[0px_4px_14px_8px_rgba(0,_0,_0,_0.1)]">
                      <img src={Logo1} className="object-contain  h-full w-full p-4"/>
                      </div>
                    
                    <div>
                      <h1 className="text-2xl text-richblack-900">Leadership</h1>
                      <p className="text-lg text-richblack-600">Fully committed to the success company.</p>
                    </div>
                  </div>
                  <div className="flex gap-10 timelineContainer">
                  <div className="h-16 w-16 rounded-full shadow-[0px_4px_14px_8px_rgba(0,_0,_0,_0.1)]">
                     
                      <img src={Logo2} className="bject-contain    h-full w-full p-4"/>
                      </div>
                    
                    <div>
                      <h1 className="text-2xl text-richblack-900">Responsibility</h1>
                      <p className="text-lg text-richblack-600">Students will always be our top priority.</p>
                    </div>
                  </div>
                  <div className="flex gap-10 timelineContainer">
                  
                      <div className="h-16 w-16 rounded-full shadow-[0px_4px_14px_8px_rgba(0,_0,_0,_0.1)]">
                      <img src={Logo3} className="object-contain  h-full w-full p-4"/>
                                            </div>
                    <div>
                      <h1 className="text-2xl text-richblack-900">Flexibility</h1>
                      <p className="text-lg text-richblack-600">The ability to switch is an important skills.</p>
                    </div>
                  </div>
                  <div className="flex gap-10">
                  
                      <div className="h-16 w-16 rounded-full shadow-[0px_4px_14px_8px_rgba(0,_0,_0,_0.1)]">
                      <img src={Logo4} className="bject-contain  h-full w-full p-4"/>

                      </div>
                    <div>
                      <h1 className="text-2xl text-richblack-900">
                      Solve the problem</h1>
                      <p className="text-lg text-richblack-600">Code your way to a solution.</p>
                    </div>
                  </div>
                  </div>

                    <div className="relative w-[50%]">
                    <img src={timeLineImages} className="w-[100%] object-cover" />
                    <div className="uppercase w-[90%] h-[100px] -bottom-26 left-1/2 -translate-x-[50%] -translate-y-[50%] bg-caribbeangreen-700 absolute z-10 flex items-center text-richblack-5 justify-evenly">
                      <div className="w-1/2 flex items-center justify-evenly h-fit">
                        <h1 className="text-4xl font-inter font-bold">10</h1>
                        <p className="text-xl text-[#05a77b]">Years <br />Expriance</p>
                      </div>
                      <div className="w-1/2 flex items-center justify-evenly border-l-[3px] border-solid border-[#05a77b]  h-fit">
                      <h1 className="text-4xl font-inter font-bold">250</h1>
                      <p className="text-xl text-[#05a77b]">Type Of <br />Course</p>
                      </div>
                    </div>
                    </div>

                </div>

                {/* Claender compare with other imageses section start  */}

                <div className="w-11/12 max-w-maxContent mx-auto py-8 mt-6 flex flex-col items-center">
                  <h1 className="text-5xl font-medium text-richblack-900 text-center font-inter">Your swiss knife for <HightLightText text={"learning any language"}/></h1>
                  <p className="text-center text-xl text-richblack-800 mt-3">Using spin making learning multiple languages easy. with 20+ languages realistic voice-over,progress tracking, <br /> custom schedule and more.</p>
                  <div className="flex pt-10">
                    <img src={KnowOtherImg} className="object-contain translate-x-16 h-full w-full"/>
                    <img src={CompareWithOtherImg} className="object-contain -translate-x-12 h-full w-full"/>
                    <img src={PlanYourLessionImg} className="object-contain -translate-x-56 h-full w-full"/>
                  </div>
                  <div>
                    <CTAButton active={true}>
                      Learn More
                    </CTAButton>
                  </div>
                </div>

                {/* Become An Instructor Section */}
                  <InstructorSection/>

{/* Footer Sectiob */}
      </div>
    </div>
  );
}

export default Home;
