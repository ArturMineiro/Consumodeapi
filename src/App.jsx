import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import Home from './pages/Home'
import Football from './pages/Football';

function App() {
  return (
 
    <BrowserRouter> 
      <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="/football" element={<Football/>} />
      </Routes> 
      </BrowserRouter>

  )
}

export default App