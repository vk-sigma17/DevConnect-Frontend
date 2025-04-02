import axios from "axios";
import React from "react";
import { BASE_URL } from "../util/constants";
import { useDispatch, useSelector } from "react-redux";
import { removeUserFromFeed } from "../util/feedSlice";

const UserCard = ({ user, showActions}) => {
  const dispatch = useDispatch()
  console.log("showActions", showActions)
    const {firstName, lastName, gender, age, about, photoUrl, _id} = user;

    const handleSendRequest = async(status, userId) => {
      try{
        const res = await axios.post(`${BASE_URL}/request/send/${status}/${userId}`, 
          {},
          {withCredentials: true}
        )
        dispatch(removeUserFromFeed(userId))
      }catch(err){
        console.error(err)
      }
    }
    

  return (
    <div className="card bg-base-content w-72 shadow-sm">
      <figure>
        <img
          src={photoUrl ? photoUrl : "https://www.mjunction.in/wp-content/uploads/2020/09/Dummy.jpg"}
          alt="user photo"
        />
      </figure>
      <div className="card-body text-white">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>
          {about}
        </p>
        
        {showActions == true && <div className="card-actions justify-center my-2">
          <button className="btn btn-primary" onClick={() => handleSendRequest("ignored", _id)}>Ignore</button>
          <button className="btn btn-secondary" onClick={() => handleSendRequest("interested", _id)}>Interested</button>
        </div> }
      </div>
    </div>
  );
};

export default UserCard;
