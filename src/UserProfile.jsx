import React from 'react'
import { useParams } from 'react-router-dom'

const UserProfile = () => {
  const userProfile = useParams().id
  return <div>Im the user Profile Page for user {userProfile}</div>
}

export default UserProfile
