import { createSlice } from "@reduxjs/toolkit";

const initialState = {
        signupData:null,
        loading:false,
        error:false,
        token: localStorage.getItem("token") ? localStorage.getItem("token") :null, 
};

export const authSclice = createSlice({
        name:"auth",
        initialState:initialState,
        reducers:{
                
                setToken(state,value){
                        state.token = value.payload
                },
                setError(state,value){
                        state.error = value.payload;
                },
                setSignupData(state,value){
                        state.signupData = value.payload
                },
                setloading(state,value){
                        state.loading = value.payload
                }
        }
});

export const {setToken,setSignupData,setloading,setError} = authSclice.actions;
export default authSclice.reducer;