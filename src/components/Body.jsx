import React from 'react'
import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

function Body() {
  return (
    <div style={{backgroundColor: "#212121", height:"100vh"}}>
        <NavBar />    
        <Outlet />
        <Footer />
    </div>
)
}

export default Body