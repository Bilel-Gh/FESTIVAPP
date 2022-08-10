import React from 'react'
import "./ProfileCard.scss"
import { useSelector, useDispatch } from "react-redux";
import Cover from '../../img/cover3.png'
import Profile from '../../img/default2.jpg'
import { Link } from 'react-router-dom';

const ProfileCard = ({location}) => {
    const { user } = useSelector((state) => state.authReducer.authData);
    const posts = useSelector((state)=>state.postReducer.posts)
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="ProfileCard">
        <div className="ProfileImages ">
            <div className="CoverContainer"> 
                <img src={
            user.coverImage
              ? serverPublic + user.coverImage
              : serverPublic + "coverdefault2.webp"
          } alt="CoverImage" />
            </div>
            <Link to={location === "profilePage" ? ""  : `/profile/${user._id}`}>
            <img 
                src={
                  user.profilePicture
                    ? serverPublic + user.profilePicture
                    : serverPublic + "profildefault.jpg"
                }
                alt="ProfileImage"
                style={{cursor: "pointer"}}
            />
            </Link>
        </div>

        <div className="ProfileName">
            <span>{user.firstname}  {user.lastname}</span>
            <span>{user.job? user.job : 'Personnalisez votre profil'}</span>
        </div>

        <div className="followStatus">
            <hr />
            <div>
                <div className="follow">
                    <span>{user.following.length}</span>
                    <span>Followings</span>
                </div>
                <div className="vl"></div>
                <div className="follow">
                    <span>{user.followers.length}</span>
                    <span>Followers</span>
                </div>
                {location === "profilePage" && (
                    <>
                        <div className="vl"></div>
                        <div className="follow">
                            <span>{posts.filter((post)=>post.userId === user._id).length}</span>
                            <span>Posts</span>
                        </div>
                    </>
                )}
            </div>
            <hr />
        </div>
        {location === "profilePage" ? "" : (
            <span style={{cursor: "pointer"}}>
                <Link to={`/profile/${user._id}`}>
                <i className="uil uil-user-circle"> </i>
                Mon Profile
                </Link>
            </span>
            )}
    </div>
  )
}

export default ProfileCard