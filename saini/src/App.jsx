import React from 'react';
import "./App.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from './Home';
import Onemovie from './Onemovie';
import 'bootstrap/dist/css/bootstrap.css';
import Signup from './Signup';
import Signin from './Signin';

const App = () => {
  

  return (
  <BrowserRouter>
  <Routes>

    <Route path='/movie' element={<Home/>}/>
    <Route path='/onemovie/:id' element={<Onemovie/>}/>
    <Route path='/' element={<Signup/>}/>
    <Route path='/signin' element={<Signin/>}/>

  </Routes>
  </BrowserRouter>
  )
}

export default App