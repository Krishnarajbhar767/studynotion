import React, { useState } from 'react'
import { HomePageExplore } from '../../data/homepage-explore';
import HightLightText from './HightLightText';
import CourseCard from './CourseCard';
const tabsName = ["Free","New to Coding","Most Popular","Skill paths","Career paths"]

function ExploreMore() {
        const [currentTab,setCurrentTab] = useState(tabsName[0]);
        const [course,setCourse] =useState(HomePageExplore[0].courses);
        const [currentCard,setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

        const setMyCards = (value)=>{
                setCurrentTab(value);
                const result = HomePageExplore.filter((course)=>course.tag === value); 
                setCourse(result[0].courses);
                setCurrentCard(result[0].courses[0].heading)
        }
  return (
    <div className='w-11/12 max-w-maxContent mx-auto py-9'>  
        <div className='text-4xl font-semibold text-center text-white'>Unlock The <HightLightText text={"Power Of Code"}/></div>
        <p className='font-medium text-center text-richblack-300 text-md mt-3'>Learn to Build Anything You Can Imagine</p>
        <div className=' rounded-full justify-center flex bg-richblack-800   w-fit mx-auto mt-4 '> 
                {tabsName.map((elem,idx)=>{
                        return (
                                <div  className={`text-[16px] flex items-center px-6 m-1 py-3 rounded-full ${currentTab === elem?"bg-richblack-900 text-richblack-5 font-medium "
                                
                                :"text-richblack-200  transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5" }`} key={idx} onClick={()=>setMyCards(elem)}>
                                        {elem}
                                </div>
                        )
                })}
        </div>
        <div className='lg:h-[290px] relative mt-6'>
                {/* course kard ka group */}
                <div className='absolute flex gap-10 justify-between w-full  h-full top-1/2 z-100'>
                        {
                                course.map((elem,idx)=>{
                                        return (
                                                <CourseCard key={idx}
                                                cardData={elem}
                                                currentCard={currentCard}
                                                setCurrentCard={setCurrentCard}
                                                />
                                        )
                                })
                        }    
                </div>
        </div>
    </div>
  )
}

export default ExploreMore