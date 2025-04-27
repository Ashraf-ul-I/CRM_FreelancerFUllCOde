import { createSlice } from "@reduxjs/toolkit";

const initialState={
    client:[],

};

const clientSlice=createSlice({
    name:"client",
    initialState,
    reducers:{
       clientData:(state,action)=>{
        state.client=action.payload.client;
       },
    }
});

export const {clientData}=clientSlice.actions;
export default clientSlice.reducer;