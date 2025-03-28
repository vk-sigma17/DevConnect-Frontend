import React from 'react'
import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from '../util/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../util/userSlice'

function Body() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const userData = useSelector((store) => store.user)

  // to maintain Data in body (so the user details does not disapper on refresh body)
  const fetchUser = async() => {
    if(userData) return;
    try{
      const res = await axios.get(BASE_URL + "/profile/view", 
        {withCredentials: true}
      );
      dispatch(addUser(res.data))
    }
    catch(err){
      if(err.status === 401){
        navigate("/login")
        }     
        console.error("ERROR :", err)
    }
  }

  React.useEffect(() => {
    
      fetchUser()
    
  }, [])

  return (
    <div style={{backgroundColor: "#212121", height:"100vh"}}>
        <NavBar />    
        <Outlet />
        <Footer />
    </div>
)
}

export default Body