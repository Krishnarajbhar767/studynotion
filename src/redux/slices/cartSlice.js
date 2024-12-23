import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
const initialState = {
                cart:localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) :[],
                totalItems:localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) :0,
                total:localStorage.getItem("total") ? JSON.parse(localStorage.getItem("totalPrice")) :0,
};              

export const cartSlice = createSlice({
        name:"cart",
        initialState:initialState,
        reducers:{
                setTotalItems(state,value){
                        state.totalItems = value.payload
                },
                resetCart(state,value){
                state.totalItems = 0
                },
                setTotal(state,value){
                        state.totalPrice = value.payload
                },
                removeFromCart(state,value){

                }
                // add to card
                // remove from cart
                // reset cart
        }
});

export const {setTotalItems,resetCart,setTotal,removeFromCart} = cartSlice.actions;
export default cartSlice.reducer;