import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../util/constants";
import { removeUser } from "../util/userSlice";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // console.log("nav :", user)

    const handleLogout = async() => {
      try{
        const response = await axios.post(
             BASE_URL + "/logout",
             { emailId: user.emailId, password: user.password }, // Sending emailId and password
             { withCredentials: true } // Ensures cookies are sent with the request
           );
           dispatch(removeUser())
           return navigate("/login")
          }catch(err){ 
          
          
        console.error("ERROR :", err)
      }


    }

  return (
    <div className="navbar bg-neutral shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl text-white hover:text-black">🧑DevConnect</Link>
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
                src={user.photoUrl}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/profile" className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <a>Settings</a>
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
