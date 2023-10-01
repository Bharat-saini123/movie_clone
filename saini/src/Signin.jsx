 import React, { useState } from 'react';
import image from "./images/flipback2.jpg";
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { useNavigate } from 'react-router-dom';

const Signin = () => {
    const navigate=useNavigate()
    const [user,setUser]=useState({
        email:"",
        password:"",
    })
    const handleInput=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        setUser({...user,[name]:value})
        }

        const sendDataSignin=async()=>{
const {email,password}=user;
try{
const response=await fetch("https://sainisahab-movie-backend.onrender.com/signin",{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({
        email,password
    }),credentials:"include"
})
const data=await response.json();
if(response.status===400){
    toast.error("plz filled all the data",{
        autoClose:1000
    })
}
if(response.status===404){
    toast.error("your email is incorrect",{
        autoClose:1000
    })
}
if(response.status===408){
    toast.error("your password is incorrect",{
        autoClose:1000
    })
}
if(response.status===200){
    toast.success("successful login",{
        autoClose:2000,
        position: "top-left",
    }),
    setUser({
        email:"",
        password:"",
    })
    navigate("/movie")
}
}catch(error){
    console.log(error)
}
        }
  return (
    <div style={{backgroundImage:`url(${image})`,height:'100vh',width:"100vw",objectFit:"contain",objectPosition:"center"}}>

    
    <div className='main-signup-box' >
<div className="signup-box" >


<div className="email-box input-box"><input type="email"  className="email" placeholder='Email' value={user.email} onChange={handleInput} name="email" autoComplete='off'/></div>

<div className="password-box input-box"><input type="password"  className="password" placeholder='Password' value={user.password} onChange={handleInput} name='password' autoComplete='off'/></div>

<div className="button"><button className='btn btn-primary' style={{fontSize:"2rem",width:"100%",marginTop:"1rem"}} onClick={sendDataSignin}>Sign in</button></div>
<NavLink className="signin" style={{textAlign:"center",fontSize:'2rem',color:"#fff",marginTop:"1rem",display:"block",textDecoration:"none"}} to={"/"}>Signup</NavLink>
</div>

    </div>
    </div>
  )
}

export default Signin