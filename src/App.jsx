import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import Gpt from './pages/Gpt'
import Football from './pages/Football';
import Home from './pages/Home';

function App() {
  return (
 
    <BrowserRouter> 
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/Home" element={<Home/>} />
        <Route path="/Gpt" element={<Gpt/>} />
        <Route path="/football" element={<Football/>} />
      </Routes> 
      </BrowserRouter>

  )
}

export default App