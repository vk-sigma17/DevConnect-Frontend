import React, { useState } from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { addUser } from "../util/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../util/constants";


function Login() {
    const [emailId, setEmailId] = useState("ModiNarendra@gmail.com");
    const [password, setPassword] = useState("Modi@123");
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin = async() => {
        try{
           const res = await axios.post(
            BASE_URL  + "/login", 
            {
                emailId, 
                password
            },
            {withCredentials: true}
        );
            dispatch(addUser(res.data));
            navigate("/")
            
        }
        catch(err){
            console.error(err);
            setError(err.response.data)
        }
    }

  return (
    <div className="flex justify-center my-12">
      <div className="card bg-base-content text-primary-content w-80 ">
        <div className="card-body">
          <h2 className="card-title flex justify-center">Login</h2>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-primary-content">Email</legend>
              <input type="text" className="input text-gray-800 text-base" placeholder="Enter Your Email" 
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              />
              <legend className="fieldset-legend text-primary-content">Password</legend>
              <input type="password" className="input text-gray-800 text-base" placeholder="Enter Your Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          <p style={{color:"red"}}>{error}</p>
          <div className="card-actions justify-center mt-4">
            <button className="btn bg-blue-500 text-black border-none" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
