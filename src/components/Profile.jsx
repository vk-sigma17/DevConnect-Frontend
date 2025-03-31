import React from 'react'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux'


function Profile() {
 
  const user = useSelector((store) => store.user)
  
  return (
    <div className='text-white'>
      {user && <EditProfile user={user}/>}
    </div>
  )
}

export default Profile