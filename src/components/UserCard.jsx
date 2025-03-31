import React from "react";

const UserCard = ({ user}) => {
    const {firstName, lastName, gender, age, about, photoUrl} = user;
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
        
         <div className="card-actions justify-center my-2">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div> 
      </div>
    </div>
  );
};

export default UserCard;
