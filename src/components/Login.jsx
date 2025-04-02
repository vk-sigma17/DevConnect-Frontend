import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../util/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../util/constants";

function Login() {
  const [emailId, setEmailId] = useState("vikash123@gmail.com");
  const [password, setPassword] = useState("Vikash@123");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginShown, setIsLoginShown] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.response.data);
    }
  };
  const handleSignup = async() => {
    try{
      const res = await axios.post(BASE_URL + "/signup", 
        {firstName, lastName, emailId, password},
      {withCredentials: true}
    )
    console.log("SDSASDF", res.data.data)
    dispatch(addUser(res.data.data));
    navigate("/profile")
    }
    catch(err){
      setError(err.response.data);

    }
  }

  return (
    <div 
    style={{ height: 'calc(100vh - 136px)' }} className={`flex justify-center ${isLoginShown ? 'items-center' : 'my-2'}`}>
      <div className="card bg-base-content text-primary-content w-80 ">
        <div className="card-body">
          <h2 className="card-title flex justify-center">
            {isLoginShown ? "Login" : "Sign Up"}
          </h2>
          <div>
            <fieldset className="fieldset">
              {!isLoginShown && (
                <>
                  {" "}
                  <legend className="fieldset-legend text-primary-content">
                    First Name
                  </legend>
                  <input
                    type="text"
                    className="input text-gray-800 text-base"
                    placeholder="Enter Your First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <legend className="fieldset-legend text-primary-content">
                    Last Name
                  </legend>
                  <input
                    type="text"
                    className="input text-gray-800 text-base"
                    placeholder="Enter Your Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </>
              )}
              <legend className="fieldset-legend text-primary-content">
                Email
              </legend>
              <input
                type="text"
                className="input text-gray-800 text-base"
                placeholder="Enter Your Email"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
              <legend className="fieldset-legend text-primary-content">
                Password
              </legend>
              <input
                type="password"
                className="input text-gray-800 text-base"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          <p style={{ color: "red" }}>{error}</p>
          <div className="card-actions justify-center mt-4">
            <button
              className="btn bg-blue-500 text-black border-none"
              onClick={isLoginShown ? handleLogin : handleSignup}
            >
              {isLoginShown ? "Login" : "Sign Up"}
            </button>
          </div>
          <p
            className="m-auto pointer"
            onClick={() => setIsLoginShown((value) => !value)}
          >
            {isLoginShown ? (
              <>
                New User? <span className="cursor-pointer text-blue-500 underline">Signup Here</span>
              </>
            ) : (
              <>
                Existing User? <span className="cursor-pointer text-blue-500 underline">Login Here</span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
