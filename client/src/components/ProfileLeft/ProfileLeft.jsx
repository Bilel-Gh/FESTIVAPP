import React from 'react'
import FollowersCard from '../FollowersCard/FollowersCard'
import InfoCard from './InfoCard/InfoCard'
import "./ProfileLeft.scss"

const ProfileLeft = () => {
  return (
    <div className="ProfileLeft">
        <InfoCard/>
        <FollowersCard/>
    </div>
  )
}

export default ProfileLeft