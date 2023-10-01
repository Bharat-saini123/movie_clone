import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "../Slices/movieSlice";

const Store=configureStore({
    reducer:{
      movieState:movieSlice.reducer 
    }
})

export default Store;