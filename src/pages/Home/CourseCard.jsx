import React from 'react'
import { MdPeopleAlt } from "react-icons/md";
import { TbHierarchy3 } from "react-icons/tb";


function CourseCard({cardData,currentCard,setCurrentCard}) {
        // ("Printing",cardData.heading,currentCard)
  return (
    <div onClick={()=>{
        setCurrentCard(cardData.heading)
    }} 
    className={` flex flex-col justify-between   text-white p-4 transition-all duration-200 ${currentCard === cardData.heading ? "bg-white card_shadow":"bg-richblack-800"}`}>
        <h1 className={`text-xl ${currentCard === cardData.heading ? "text-richblack-900" :"text-white"}`}>{cardData.heading}</h1>
        <p className={`${currentCard === cardData.heading ?"text-richblack-900 text-md" :"text-richblack-300 text-md"}`}>{cardData.description}</p>
        <div className={`flex justify-between h-14 items-end border-t border-dotted ${currentCard === cardData.heading ?"text-blue-200":"text-richblack-300"}`}>
                <h2 className='flex items-center gap-4 cursor-pointer'><span><MdPeopleAlt/></span>{cardData.level}</h2>
                <p className='flex items-center gap-4 cursor-pointer'><span><TbHierarchy3/></span>{cardData.lessionNumber} Lession</p>
        </div>
    </div>
  )
}

export default CourseCard