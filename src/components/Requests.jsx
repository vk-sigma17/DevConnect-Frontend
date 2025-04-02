import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../util/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest, removeRequest } from '../util/requestSlice'

function Requests() {
    const dispatch = useDispatch()
    const request = useSelector((store) => store.request)


    
    // const handleRequest = async (status, _id) => {
    //     try {
    //       const res = await axios.post(
    //         BASE_URL + "/request/review" + "/" + status + "/" + _id,
    //         {},
    //         { withCredentials: true }
    //       );
    //       dispatch(removeRequest(_id));
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   };
    const handleRequest = async (status, _id) => {
        try {
            await axios.post(
                `${BASE_URL}/request/review/${status}/${_id}`,
                {},
                { withCredentials: true }
            );
            dispatch(removeRequest(_id));
        } catch (error) {
            setError("Failed to process request");
            console.error(error);
        }
    }
    

    const fetchRequest = async() => {
        try{

            const res = await axios.get(BASE_URL + "/user/requests/recieved", 
                {withCredentials: true}
            )
            dispatch(addRequest(res.data.connectionRequests))
        }
        catch(err){
            console.error(err)
        }
    }

    useEffect(() => {
        fetchRequest();
    }, [])

if(!request){
    return;
 }   
 if(request.length === 0){
    return <h2 className='flex justify-center my-6 text-white'>No Request Found!</h2>
}


  return (
<div className="flex flex-col justify-center items-center w-auto  my-6">    
    {request.map((req) => {
        const {firstName, lastName, photoUrl, about, age, gender, _id} = req.fromUserId;

      return <div key={_id} class="card  bg-base-100 card-xs shadow-sm my-2">
       <div class="card-body flex flex-row justify-around items-center">
        <img 
            src={photoUrl}
            alt='connection photo'
            className="rounded-full w-24 h-24 object-cover"
        />
        <div className='flex flex-col justify-center items-center sm:flex-row'>

            <div>
                <h2 class="card-title">{firstName + " " + lastName}</h2>
                {age && gender && <p>{age + ", " + gender}</p>}
                <p>{about}</p>
            </div>
            <div className="flex flex-row justify-center my-2">
            <button className="btn btn-secondary mx-2" onClick={() => handleRequest("rejected", req._id)}>Reject</button>
            <button className="btn btn-primary" onClick={() => handleRequest("accepted", req._id)}>Accept</button>
            </div> 
        </div>
      </div>
    </div>
    })}
  </div>
  )
}

export default Requests