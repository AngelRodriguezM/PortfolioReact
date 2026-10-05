import { useState } from 'react'
import './App.css'
import NavBar from './components/navbar.jsx'
import { Routes, Route} from 'react-router'
import Home from './Pages/Home.jsx'
import Projects from './Pages/Projects.jsx'


function App() {

  return (
    <>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>} ></Route>
        <Route path="/Projects" element={<Projects/>} ></Route>
      </Routes>


    </>
  )
}

export default App
