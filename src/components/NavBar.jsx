import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../util/constants";
import { removeUser } from "../util/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { removeFeed } from "../util/feedSlice";
import { removeRequest } from "../util/requestSlice";

function NavBar() {
    const user = useSelector((store) => store.user);
    // const request = useSelector((store) => store.request)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // console.log("nav :", user.photoUrl)

    const handleLogout = async() => {
      try{
        const response = await axios.post(
             BASE_URL + "/logout",
             { emailId: user.emailId, password: user.password }, // Sending emailId and password
             { withCredentials: true } // Ensures cookies are sent with the request
           );
           dispatch(removeUser())
           dispatch(removeFeed())
           dispatch(removeRequest())
           return navigate("/login")
          }catch(err){ 
          
          
        console.error("ERROR :", err)
      }


    }
// if(!request){
//   request;
// }

  return (
    <div className="navbar bg-neutral shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl text-white hover:text-black">🧑Devloper<span
        style={{backgroundColor:"#fc8c03", color:'black', padding:"-1px 2px", marginLeft:"-4px", borderRadius:"5px"}}
        >hub</span></Link>
      </div>
     {user && <div className="flex gap-2 items-center">
        <div className="text-white">Welcome, {user.firstName}</div>
        <div className="dropdown dropdown-end mx-4">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full ">
              <img
                alt="User Photo"
                src={user.photoUrl || "https://www.mjunction.in/wp-content/uploads/2020/09/Dummy.jpg"}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link 
               to="/profile"
              
              className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <Link to="/connection">My Connection</Link>
            </li>
            <li>
              <Link to="/request">Requests
              {/* <span className="badge" style={{color:"green"}}>{request && request.length}</span> */}
              </Link>
            </li>
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>} 
        
    </div>
  );
}

export default NavBar;
