import React from 'react';
import FollowersCard from '../FollowersCard/FollowersCard';
import ProfileCard from '../ProfileCard/ProfileCard';
import "./ProfileSide.scss";

const ProfileSide = () => {
  return (
    <div className="ProfileSide">
        <ProfileCard/>
        <FollowersCard/>
    </div>
  )
}

export default ProfileSide