import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import {addOneMovieData} from "./Slices/movieSlice";
import { NavLink } from 'react-router-dom';


const Onemovie = () => {
  const dispatch=useDispatch();
  const movieData=useSelector((state)=>{
return state.movieState.oneMovieData
  })
console.log(movieData)
    const {id}=useParams();
    const URL=`https://www.omdbapi.com/?i=${id}&apikey=f60b8d42`;

    const getOneMovieData=async(url)=>{
      const response=await fetch(url);
      const data=await response.json();
     dispatch(addOneMovieData(data))

    }
  useEffect(()=>{
    getOneMovieData(URL)
  },[])
  return (
    <div className='top-one-movie-data' style={{width:"100vw",height:"100vh",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:'column'}}>
<div className="main-one-movie">
<div className="image">
<figure style={{width:"30rem",height:'30rem'}} className='figure-one-movie'>
  <img src={movieData.Poster} alt="" style={{width:"100%",height:"100%",objectFit:"contain",objectPosition:"center",display:'block'}} />
</figure>
</div>

<div className="other-image-box-one-movie">
<div className="title" style={{fontSize:'3rem',textTransform:"capitalize"}}><span style={{fontWeight:"500"}}>Movie Name</span> : {movieData.Title}</div>
<div className="genure" style={{fontSize:'2rem',textTransform:"capitalize",marginTop:"1rem"}}>
 <span style={{fontWeight:"500"}}>Title</span>  : {movieData.Genre}
</div>
<div className="language" style={{fontSize:'2rem',textTransform:"capitalize",marginTop:"1rem"}}><span style={{fontWeight:"500"}}>Language</span> : {movieData.Language}</div>


<div className="rating"style={{fontSize:'2rem',textTransform:"capitalize",marginTop:"1rem"}}><span style={{fontWeight:"500"}}>Rating</span>  : {movieData.imdbRating}</div>
<div className="year"style={{fontSize:'2rem',textTransform:"capitalize",marginTop:"1rem"}}> <span style={{fontWeight:"500"}}>Year</span> : {movieData.Year}</div>

<div className="buttons" style={{display:'flex',justifyContent:"flex-start",alignItems:'center',marginTop:"2rem"}}>
  <div className="button-1" >
<NavLink to={"/movie"}><button className='btn btn-primary' style={{display:"inline-block",fontSize:"2rem"}}>Back</button></NavLink>
  </div>
  <div className="button-2">
  <button className='btn btn-danger' style={{display:"inline-block",fontSize:"2rem",marginLeft:"1rem"}}>Watch</button>
  </div>
</div>
</div>

</div>

    </div>
  )
}

export default Onemovie