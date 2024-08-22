import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import Gpt from './pages/Gpt'
import Football from './pages/Football';
import Home from './pages/Home';
import Cat from './pages/Cat';
import Weather from './pages/Weather';
import Coin from './pages/Coin';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (

    <BrowserRouter> 
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/Home" element={<Home/>} />
        <Route path="/Gpt" element={<Gpt/>} />
        <Route path="/football" element={<Football/>} />
        <Route path="/cat" element={<Cat/>} />
        <Route path="/weather" element={<Weather/>} />
        <Route path="/coin" element={<Coin/>} />
      </Routes> 
      </BrowserRouter>

  )
}

export default App