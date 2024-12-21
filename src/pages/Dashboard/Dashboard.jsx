import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/core/Dashboard/Sidebar';

function Dashboard() {
        const  {loading : profileLoading} = useSelector((state)=> state.profile);
        const  {loading : authLoading} = useSelector((state)=> state.auth);

        if (profileLoading || authLoading) {
                return <div className='loader'></div>
        }
  return (
    <div className='relative flex min-h-[calc(100vh-3.5rem)] w-screen'>
        <Sidebar/>
        <div className='w-11/12 max-w-maxContentTab mx-auto py-10 h-fit'>
        <div>
        <Outlet/>
        </div>
        </div>
    </div>
  )
}

export default Dashboard