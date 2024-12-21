import React from 'react'
import CTAButton from "./Button"
import HightLightText from './HightLightText'
import { FaArrowRight } from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation'
function CodeBlock({
        position,heading,subHeading,ctabtn1,ctabtn2,codeblock,backgroundGradient,codeColor,reverse
}) {
  return (
    <div className={`flex flex-row ${position} my-20 justify-between gap-10 ${reverse && "flex-row-reverse"}`}>
        {/* section 1 */}
        <div className='w-[50%] flex flex-col gap-8'>
        {heading}
        <div className='text-richblack-300 font-bold'>
                {subHeading}
        </div>
        {/* buttons */}
        <div className='flex gap-7 mt-4'>
        <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto} >
        <div className='flex gap-7 items-center'>
                {ctabtn1.btnText}
                <FaArrowRight/>
        </div>
        </CTAButton>
        <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto} >

                {ctabtn2.btnText}

        </CTAButton>
        </div>
        </div>
        {/* Section 2 */}
        <div className='glass h-fit flex flex-row w-[100%] py-4 lg:w-[500px]'>
                <div className='w-[10%] text-center flex flex-col text-richblack-400 font-inter font-bold'>
                                <p>1</p>
                                <p>2</p>
                                <p>3</p>
                                <p>4</p>
                                <p>5</p>
                                <p>6</p>
                                <p>7</p>
                                <p>8</p>
                                <p>9</p>
                                <p>10</p>
                                <p>11</p>
                </div>

                {/* Inner part for runninf code */}
                <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}>
                        <TypeAnimation
                        sequence={[codeblock,5000,""]}
                        repeat={Infinity}
                        omitDeletionAnimation={true}
                        style={{
                                whiteSpace:"pre-line",
                                display:"block"
                        }}
                        />
                </div>
        </div>
    </div>
  )
}

export default CodeBlock