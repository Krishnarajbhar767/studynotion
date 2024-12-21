import React, { useState } from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import { logOut } from '../../../services/opration/authApi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { Instructor } from '../../../../constant';
import SidebarLink from './SidebarLink';

// import ConfirmationModal from '../../common/ConfirmationModal.jsx';
import { IoMdLogOut } from 'react-icons/io';
import ConfirmationModalComponent from '../../common/ConfirmationModal.jsx';
function Sidebar() {
  const {user,loading:profileLoading} = useSelector((state)=>state.profile);
  const {loading:authLoading} = useSelector((state)=>state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [ConfirmationModal,setConfirmationModal] = useState(null);

  if (authLoading||profileLoading) {
    return <div className='loader'></div>
  }
  return (
    <div className=' min-h-fit bg-richblack-800'>
      <div className='flex lg:min-w[222px] flex-col border-r-[1px] border-richblack-700 h-[calc-[100vh-3.5rem] bg-richblack-800 py-10]'>
        <div className='flex flex-col'>
          {
            sidebarLinks.map((link,idx)=>{
              if (link.type && user?.accountType !== link.type) return null;
              return <SidebarLink key={link.id} link={link} iconName={link.icon}/>
            })
          }
        </div>
        <div className='mx-auto mt-6 mb-6 h-1 w-10/12 bg-richblack-700'></div>
        <div className='flex flex-col '>
          <SidebarLink
          link={{name:"Setting",path:"/dashboard/settings",iconName:"VscSettingsGear"}}
          />
          <button onClick={()=>{
            setConfirmationModal({
              text1: "Are you sure?",
              text2: "You will be logged out of your account.",
              btn1Text: "Logout",
              btn2Text: "Cancel",
              btn1Handler:()=>{
                dispatch(logOut(navigate))
              },
              btn2Handler:()=>{
                setConfirmationModal(null)
              }
            })
          }}
          className='px-8 py-2 text-sm font-medium text-richblack-300'
          >
            <div className='flex items-center gap-x-2'>
            <IoMdLogOut className='text-lg'/>
            Logout
            </div>
          </button>
        </div>
      </div>
     {
      ConfirmationModal &&  <ConfirmationModalComponent modalData={ConfirmationModal}/>
     }
    </div>
  )
}

export default Sidebar