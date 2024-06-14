import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    loading: false,
    error: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        loginStart: (state)=>{
            state.loading = true;
        },
        loginSuccess: (state, action)=>{
            state.currentUser = action.payload.data;
            state.loading=false;
            state.error=null;
            // console.log("upper",action.payload);
        },
        loginFailure: (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        },
        updateUserStart: (state, action)=>{
            state.loading = true; 
        },
        updateUserSuccess: (state, action)=>{
            state.currentUser = action.payload.data._doc;
            // console.log("lower",action.payload.data._doc);
            state.loading=false;
            state.error=null;
        },
        updateUserFailure: (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        },
        logoutSuccess: (state)=>{
            state.currentUser = null;
            state.loading=false;
            state.error=null;
        },
    }
})

export const {loginFailure, loginStart, loginSuccess, updateUserFailure, updateUserStart, updateUserSuccess, logoutSuccess} = userSlice.actions;
export default userSlice.reducer;