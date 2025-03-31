import React, { use, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 
import UserCard from "./userCard";
import axios from "axios";
import { BASE_URL } from "../util/constants";

const EditProfile = ({ user}) => {
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender);
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
  const [about, setAbout] = useState(user?.about);
  const [error, setError] = useState("");


  const updateProfile = async() => {
    // clearing Error
    setError("")
    try{
        const res = await axios.patch(BASE_URL + "/profile/edit", 
            {
                firstName,
                lastName,
                age,
                gender,
                about,
                photoUrl
            },
            {withCredentials: true}
        )
        toast.success(res.data.message)
    }
        catch(err){
            // toast.error(err.response.data)
            setError(err.response.data)
        }
  }

  return (
    <>
        <ToastContainer />
        <div className="flex justify-center my-6">
        <div className="card bg-base-content text-primary-content w-80">
            <div className="card-body">
            <h2 className="card-title flex justify-center">Edit Profile</h2>
            <div>
                <fieldset className="fieldset">
                <div className="flex items-center mb-4">
                    
                    
                    <legend className="fieldset-legend text-primary-content w-1/4">
                    First Name
                    </legend>
                    <input
                    type="text"
                    className="input input-xs text-gray-800 text-base w-3/4"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>

                <div className="flex items-center mb-4">
                    {" "}
                    {/* Flex container for label and input */}
                    <legend className="fieldset-legend text-primary-content w-1/4">
                    Last Name
                    </legend>
                    <input
                    type="text"
                    className="input input-xs text-gray-800 text-base w-3/4"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    />
                </div>

                <div className="flex items-center mb-4">
                
                    {/* Flex container for label and input */}
                    <legend className="fieldset-legend text-primary-content w-1/4">
                    Photo Url
                    </legend>
                    <input
                    type="text"
                    className="input input-xs text-gray-800 text-base w-3/4"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    />
                </div>

                <div className="flex items-center mb-4">
                
                    <legend className="fieldset-legend text-primary-content w-1/4">
                    Age
                    </legend>
                    <input
                    type="number"
                    className="input input-xs text-gray-800 text-base w-3/4"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    />
                </div>

                <div className="flex items-center mb-4">
                    {" "}
                    {/* Flex container for label and input */}
                    <legend className="fieldset-legend text-primary-content w-1/4">
                    Gender
                    </legend>
                    <select className="input input-xs text-gray-800 text-base w-3/4"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    >
                    <option value="" disabled={true} selected>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    </select>
                </div>

                <div className="flex items-start mb-4">
                    
                    <legend className="fieldset-legend text-primary-content w-1/4">
                    About
                    </legend>
                    <textarea
                    className="input input-xs text-gray-800 text-base w-3/4"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    rows="4"
                    ></textarea>
                </div>
                </fieldset>
            </div>
            <p className="text-red-500 text-center">{error}</p>

            <div className="card-actions justify-center mt-4">
                <button
                className="btn bg-blue-500 text-black border-none"
                    onClick={updateProfile}
                >
                Update Profile
                </button>
            </div>
            </div>
        </div>

        <UserCard user={{ firstName, lastName, age, gender, photoUrl, about }}/>
        </div>
    </>
  );
};

export default EditProfile;
