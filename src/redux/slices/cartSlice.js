import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
const initialState = {
                totalItems:localStorage.getItem("totalItems") ? JSON.parse("totalItems") :0,
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
                // add to card
                // remove from cart
                // reset cart
        }
});

export const {setTotalItems,resetCart} = cartSlice.actions;
export default cartSlice.reducer;