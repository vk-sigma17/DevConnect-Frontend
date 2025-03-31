import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../util/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest, removeRequest } from '../util/requestSlice'

function Requests() {
    const dispatch = useDispatch()
    const request = useSelector((store) => store.request)

    const handleRequest = async (status, _id) => {
        try {
            await axios.post(
                `${BASE_URL}/request/review/${status}/${_id}`,
                {},
                { withCredentials: true }
            );
            dispatch(removeRequest(_id));
        } catch (error) {
            console.error(error);
        }
    }

    const fetchRequest = async() => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests/recieved", 
                {withCredentials: true}
            )
            // console.log("Received requests data:", res.data.data);
            dispatch(addRequest(res.data.data))
        }
        catch(err){
            console.error("Error fetching requests:", err)
        }
    }

    useEffect(() => {
        fetchRequest();
    }, [])

    if(!request){
        return <h2 className='flex justify-center my-6 text-white'>No Request Found!</h2>
        // return;
    }   
    if(request.length === 0){
        return <h2 className='flex justify-center my-6 text-white'>No Request Found!</h2>
    }

    const getImageUrl = (photoUrl) => {
        if (!photoUrl) return "https://www.mjunction.in/wp-content/uploads/2020/09/Dummy.jpg";
        
        // If the URL is relative (starts with /), prepend the BASE_URL
        if (photoUrl.startsWith('/')) {
            return `${BASE_URL}${photoUrl}`;
        }
        
        // If the URL doesn't start with http/https, prepend https://
        if (!photoUrl.startsWith('http://') && !photoUrl.startsWith('https://')) {
            return `https://${photoUrl}`;
        }
        
        return photoUrl;
    };

    return (
        <div className="flex flex-col justify-center items-center w-auto my-6">  
           
            {request.map((req) => {
                const {firstName, lastName, photoUrl, about, age, gender, _id} = req.fromUserId;
                console.log("ASDFG",_id)
                
                
                const imageUrl = getImageUrl(photoUrl);

                return (
                    <div key={_id} className="card bg-base-100 card-xs shadow-sm my-2 w-1/3">
                        <div className="card-body flex flex-row justify-around items-center">
                            <img 
                                src={imageUrl}
                                alt={`${firstName}'s photo`}
                                className="rounded-full w-24 h-24 object-cover"
                                onError={(e) => {
                                    console.log("Image failed to load:", imageUrl);
                                    e.target.src = "https://www.mjunction.in/wp-content/uploads/2020/09/Dummy.jpg";
                                }}
                                loading="lazy"
                            />
                            <div>
                                <h2 className="card-title">{firstName + " " + lastName}</h2>
                                {age && gender && <p>{age + ", " + gender}</p>}
                                <p>{about}</p>
                            </div>
                            <div className="flex flex-row justify-center my-2">
                                <button className="btn btn-secondary mx-2" onClick={() => handleRequest("rejected", req._id)}>Reject</button>
                                <button className="btn btn-primary" onClick={() => handleRequest("accepted", req._id)}>Accept</button>
                            </div> 
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default Requests