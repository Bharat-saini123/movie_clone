import {createSlice} from "@reduxjs/toolkit";

const movieSlice=createSlice({
    name:"movie",
    initialState:{
        arrayData:[],
        text:"avengers",
        oneMovieData:[],
    },
    reducers:{
        addData:(state,action)=>{
state.arrayData=action.payload

        },
        changeTextData:(state,action)=>{
           state.text=action.payload.text;
        },
        addOneMovieData:(state,action)=>{
state.oneMovieData=action.payload
        }
    
        
    },

})

export const {addData,changeTextData,addOneMovieData}=movieSlice.actions;
export default movieSlice;