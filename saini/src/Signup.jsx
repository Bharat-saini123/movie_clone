import React, { useState } from 'react';
import image from "./images/flipback2.jpg";
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate=useNavigate();
const [user,setUser]=useState({
    firstname:"",
    lastname:"",
    email:"",
    phone:"",
    password:"",
    confirmpassword:""
})

const handleInput=(event)=>{
const name=event.target.name;
const value=event.target.value;
setUser({...user,[name]:value})
}
const sendDataSignup=async()=>{
    const {firstname,lastname,email,password,phone,confirmpassword}=user;
    console.log(firstname,lastname,email,phone,password,confirmpassword)
try{
    const response=await fetch("https://sainisahab-movie-backend.onrender.com/signup",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            firstname,lastname,email,phone,password,confirmpassword
        }),
        credentials:"include"
    })
    const data=await response.json();
if(response.status===400){
    toast.error("plz filled all the data",{
        autoClose:1000
    })
}
if(response.status===404){
    toast.error("your email is not correct",{
        autoClose:1000
    })
}
if(response.status===408){
    toast.error("your number is incorrected",{
        autoClose:1000
    })
}
if(response.status===412){
    toast.info("your email is already exist",{
        autoClose:1000
    })
}
if(response.status===416){
    toast.info("your password not match confirm password",{
        autoClose:1000
    })
}
if(response.status===200){
    toast.success("successful register",{
        autoClose:2000,
        position: "top-left",
    }),
    setUser({
        firstname:"",
        lastname:"",
        email:"",
        phone:"",
        password:"",
        confirmpassword:""
    })
    navigate("/signin")
}


}catch(error){
    console.log(error)
}
}
  return (
  
  <div style={{backgroundImage:`url(${image})`,height:'100vh',width:"100vw",objectFit:"contain",objectPosition:"center"}}>

    
    <div className='main-signup-box' >
<div className="signup-box" >

<div className="firstname-box input-box"><input type="text" className="firstname" placeholder='Firstname' value={user.firstname} onChange={handleInput} name='firstname' autoComplete='off'/></div>
<div className="lastname-box input-box"><input type="text" className="lastname" placeholder='Lastname' value={user.lastname} onChange={handleInput} name='lastname' autoComplete='off'/></div>
<div className="email-box input-box"><input type="email"  className="email" placeholder='Email' value={user.email} onChange={handleInput} name="email" autoComplete='off'/></div>
<div className="phone-box input-box"><input type="number"  className="phone" placeholder='Phone'value={user.phone} onChange={handleInput} name='phone' autoComplete='off'/></div>
<div className="password-box input-box"><input type="password"  className="password" placeholder='Password' value={user.password} onChange={handleInput} name='password' autoComplete='off'/></div>
<div className="confirmpassword-box input-box"><input type="password"  className="confirmpassword" placeholder='Confirmpassword' value={user.confirmpassword} autoComplete='off' onChange={handleInput} name='confirmpassword'/></div>
<div className="button"><button className='btn btn-primary' style={{fontSize:"2rem",width:"100%",marginTop:"1rem"}} onClick={sendDataSignup}>Signup</button></div>
<NavLink className="signin" style={{textAlign:"center",fontSize:'2rem',color:"#fff",marginTop:"1rem",display:"block",textDecoration:"none"}} to={"/signin"}>Signin</NavLink>
</div>

    </div>
    </div>
  )
}

export default Signup