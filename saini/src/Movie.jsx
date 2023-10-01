import React, { useEffect, useState } from 'react';
import {useSelector,useDispatch} from "react-redux";
import {addData} from "./Slices/movieSlice";
import { NavLink } from 'react-router-dom';







const Movie = () => {
    const[myloading,setMyLoading]=useState(false);
    const dispatch=useDispatch();
    
    const movieData=useSelector((state)=>{
return state.movieState.arrayData
    })
    console.log(movieData)
    const textData=useSelector((state)=>{
return state. movieState.text
    })
 
   
    const URL=`https://www.omdbapi.com/?i=tt3896198&apikey=f60b8d42&s=${textData}`;
   const getMovieData=async(url)=>{
const response=await fetch(url);
const data=await response.json();

if(data.Response==="True"){
    dispatch(addData(data.Search))  
}else{
    console.log(data.Error)
}

   }



    useEffect(()=>{
  const id=setTimeout(()=>{
    getMovieData(URL)
  },1000)
 
    },[textData])
  return (
    <div className='top-movie-data'>
        <div className='main-movie-grid-box'>


    {
       movieData===undefined||movieData===null?"":
        movieData.map((currData,index)=>{
return <NavLink className='main-movie' key={index} style={{textDecoration:"none",color:"black",display:"block"}} to={`/onemovie/${currData.imdbID}`}>

<figure style={{width:'25rem',height:'25rem'}}><img src={currData.Poster} alt="" style={{width:"100%",height:"100%",objectFit:'contain',objectPosition:'center',display:'inline-block'}}/></figure>

<div className="title" style={{fontSize:"1.5rem",textAlign:"center",marginTop:"1rem"}}>{currData.Title}</div>
<div className="button"><button className='btn btn-primary' style={{marginTop:'1rem',fontSize:"1.5rem",width:"100%"}}>Explore </button></div>
</NavLink>
        })
    }
        </div>


    </div>
  )
}

export default Movie