import React from 'react'
import { useSelector } from 'react-redux'

function RenderTotalAmount() {
        const {total,cart} = useSelector((state)=>state.cart);
        const handleBuyCourse = ()=>{
                const courses = cart.map((course)=>course._id);
                console.log("Bought These Course",courses)
        }
  return (
    <div>
        <p>Total Amount</p>
        <p>Rs {total}</p>
        <button 
        className='w-full justify-center'
        onClick={handleBuyCourse}
        >Buy Now</button>
    </div>
  )
}

export default RenderTotalAmount