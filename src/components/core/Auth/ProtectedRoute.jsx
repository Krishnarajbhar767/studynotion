import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import Login from '../../../pages/Login/Login';
import { useEffect } from 'react';
function ProtectedRoute({children}) {
        const navigate = useNavigate();
        
const {token} = useSelector((state)=>state.auth);
if (!token) {
        useEffect(() => {
navigate("/login")
        }, [])
        
}

  return (
    <div>
        {
                children
        }
    </div>
  )
}

export default ProtectedRoute