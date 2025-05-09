import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../util/constants'
import { addConnection, removeConnection } from '../util/connectionSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Connections = () => {
    const dispatch = useDispatch()
    const connections = useSelector((store) => store.connection);


    const fetchConnections = async() => {
        try{
        dispatch(removeConnection())    
        const res = await axios.get(BASE_URL + "/user/connections", 
                {withCredentials: true}
            )
          dispatch(addConnection(res.data.data)) 

        }
        catch(err){
            console.error(err)
        }
    }

useEffect(() => {
    fetchConnections()
}, [])

if(!connections){
    return;
}
if(connections.length === 0){
 return <h2 className='flex justify-center items-center my-6 text-white'>No Connection Found!</h2>
}

 return (
    <div className="flex flex-col items-center justify-center flex-wrap my-6"> {/* Added 'flex-col' here */}
    {connections.map((connection) => {
      return (
        <div style={{Width:"350px"}} key={connection._id} className="card flex  px-6 bg-base-100 card-xs shadow-sm mb-4"> {/* Added 'mb-4' to add spacing between cards */}
          <div className="card-body flex flex-row justify-between items-center w-full">
            <img
              src={connection?.photoUrl || "https://www.mjunction.in/wp-content/uploads/2020/09/Dummy.jpg"}
              alt="connection photo"
              className="rounded-full w-24 h-24 object-cover"
              onError={(e) => {
                // Fallback to default image if the original fails to load
                e.target.src = "https://www.mjunction.in/wp-content/uploads/2020/09/Dummy.jpg";
              }}
            />
            <div>
              <h2 className="card-title">{connection.firstName + " " + connection.lastName}</h2>
              {connection.age && connection.gender && <p>{connection.age + ", " + connection.gender}</p>}
              <p style={{minWidth:"150px"}}>{connection.about}</p>
            </div>
            <Link to={`/chat/${connection._id}`}>
                <button className='btn btn-primary'>Chat</button>
            </Link>
          </div>
        </div>
      );
    })}
  </div>
  
);

  
}

export default Connections