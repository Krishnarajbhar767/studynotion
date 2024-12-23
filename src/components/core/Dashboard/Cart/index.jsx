import { useSelector } from "react-redux";
import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";

export default function Cart() {
        const {total,totalItems,cart} = useSelector((state)=>state.cart)
  return (
    <div className="text-richblack-25">
      <h1>Your Cart</h1>
      <p>{totalItems} Courses in cart</p>
      {
        total > 0 ? (<div><RenderCartCourses/><RenderTotalAmount/></div>) :(<div><p>Your Cart Is Empty</p></div>)
      }
    </div>
  );
}
