import { createSlice } from "@reduxjs/toolkit";

const initialState = {
        user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
        loading:false,
};

export const profileSclice = createSlice({
        name:"profile",
        initialState:initialState,
        reducers:{
             setUser(state,value){
                state.user = value.payload
             },
             setLoading(state,value){
                state.loading = value.payload
             }
        }
});

export const {setUser,setLoading} = profileSclice.actions;
export default profileSclice.reducer;