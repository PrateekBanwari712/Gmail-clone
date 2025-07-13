import { createSlice } from "@reduxjs/toolkit";

const appslice = createSlice({
    name: "appSlice",
    initialState: {
        open: false ,
        emails:[],
        selectedEmail: null,
        searchText:"",
        user:null,
    },
    reducers: {
        //actions
        setopen: (state, action) => {
            state.open = action.payload;
        },
        setEmails: (state, action)=>{
            state.emails = action.payload;
        },
        setselectedEmail:(state, action)=>{
            state.selectedEmail = action.payload;
        },
        setsearchText:(state, action)=>{
            state.searchText = action.payload;
        },
        setuser:(state, action)=>{
            state.user= action.payload    
        }
    }
})
export const {setopen, setEmails, setselectedEmail, setsearchText, setuser} = appslice.actions;
export default appslice.reducer;