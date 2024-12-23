import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { IoMdStar, IoMdStarOutline } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { removeFromCart } from "../../../../redux/slices/cartSlice";

function RenderCartCourses() {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  return (
    <div>
      {cart.map((course, idx) => (
        <div>
          <div>
            <img src={course?.thumbnail} />
            <div>
              <p>{course?.courseName}</p>
              <p>{course?.category?.name}</p>
              <div>
                <span>4.8</span>
                <ReactStars
                  count={5}
                  onChange={ratingChanged}
                  size={24}
                  activeColor="#ffd700"
                  emptyIcon={<IoMdStarOutline />}
                fullIcon={<IoMdStar />}
                />
                <span>{course?.ratingAndReviews.length} Ratings</span>
              </div>
            </div>
          </div>
                <div>
                        <button
                        onClick={()=>dispatch(removeFromCart(course._id))}
                        >
                                <MdDeleteForever />
                                <span>Remove</span>
                        </button>
                        <p>{course?.price}</p>
                </div>
        </div>
      ))}
    </div>
  );
}

export default RenderCartCourses;
