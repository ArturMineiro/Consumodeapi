import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import Home from './pages/Home'

function App() {
  return (
 
    <BrowserRouter> 
      <Routes>
        <Route path="/home" element={<Home/>} />
      </Routes> 
      </BrowserRouter>

  )
}

export default App