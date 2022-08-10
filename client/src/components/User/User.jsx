import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { followUser, unfollowUser } from "../../actions/UserAction";
const User = ({ person }) => {
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch()
  
  const [following, setFollowing] = useState(
    person.followers.includes(user._id)
  );
  const handleFollow = () => {
    following
      ? dispatch(unfollowUser(person._id, user))
      : dispatch(followUser(person._id, user));
    setFollowing((prev) => !prev);
  };
  return (
        <div className="follower" key={person.id}>
        <div>
        <img className="followerImage" src={
                publicFolder + person.profilePicture && person.profilePicture !== ""
                ? publicFolder + person.profilePicture
                : publicFolder + "profildefault.jpg"
            } alt={person.firstname} />
        <div className="name">
            <span> {person.firstname}</span>
            <span> @{person.username}</span>
        </div>
        </div>
        <button onClick={handleFollow} className={following ? 'btn btn-primary': 'btn'}>
        {following ? "Unfollow" : "Follow"}
        </button>
    </div>
  );
};

export default User;