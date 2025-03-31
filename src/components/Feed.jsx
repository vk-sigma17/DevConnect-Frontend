
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../util/constants';
import { addFeed } from '../util/feedSlice';
import UserCard from './userCard';

function Feed() {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed)
  console.log("Feed", feed)

  const getFeed = async() => {
    if(feed) return;
    try{
      const res = await axios.get(BASE_URL + "/feed",
        {withCredentials: true}
      )
      console.log("reeee", res.data)
      dispatch(addFeed(res?.data));
    }
      catch(err){
        console.error(err)
      }
  }

  useEffect(() => {
    getFeed();
    
  }, [])

  return (
    feed &&
      <div className='flex justify-center my-6'>
        <UserCard user={feed[3]}/>
      </div>

    
      
  )
}

export default Feed