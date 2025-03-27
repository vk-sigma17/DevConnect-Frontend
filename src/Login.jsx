import React, { useState } from "react";
import axios from 'axios';

function Login() {
    const [emailId, setEmailId] = useState("zuckerbergMark1@gmail.com");
    const [password, setPassword] = useState("Zuckerberg@1231");

    const handleLogin = async() => {
        try{
           const res = await axios.post("http://localhost:7777/login", 
            {
                emailId, 
                password
            },
            {withCredentials: true}
        );
            console.log("AAA",res.data)
        }
        catch(err){
            console.error(err)
        }
    }

  return (
    <div className="flex justify-center my-12">
      <div className="card bg-base-content text-primary-content w-96 h-[316px]">
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
          <div className="card-actions justify-center mt-4">
            <button className="btn bg-blue-500 text-black border-none" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
