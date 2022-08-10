import React, { useEffect, useState } from "react";
import "./Post.scss";
import { useSelector } from "react-redux";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { likePost } from "../../api/PostRequest";

const Post = ({data}) => {
    const { user } = useSelector((state) => state.authReducer.authData);
    const [liked, setLiked] = useState(data.likes.includes(user._id));
    const [likes, setLikes] = useState(data.likes.length)
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

    const handleLike = () => {
        likePost(data._id, user._id);
        setLiked((prev) => !prev);
        liked? setLikes((prev)=>prev-1): setLikes((prev)=>prev+1)
      };


  return (
    <div className="Post">
        <div className="PostInfos">
            <img 
                src={serverPublic + data.userInfos.profilePicture }
                alt="ProfileImage"
            />
            <div className='UserDetailContainer'>
                <div className='UserDetail'> 
                    <div>
                    <span><b>@{data.userInfos.username}</b></span>
                        <div>
                            {data.userInfos.ville ? <> <i className="uil uil-map-pin"></i> <span>{data.userInfos.ville}</span> </> : ""}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <img src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""} alt="" />

        <div className="postReact">
            <div>
                {liked ? ( <FontAwesomeIcon className="LikedHeart" style={{cursor: "pointer"}} onClick={handleLike} icon={faHeart} /> ) : ( <i onClick={handleLike} style={{cursor: "pointer"}} className="uil uil-heart"></i> )}
                <i className="uil uil-comment-dots"></i>
                <i className="uil uil-share-alt"></i>
            </div>
            <i className="uil uil-bookmark"></i>
        </div>

        <span>{likes} likes</span>
        <div className="detail">
            <div>
                <span><b>@{data.userInfos.username}</b></span>
                <span>{data.desc}</span>
                {data.festival ? <span>  #{data.festival}</span> : ""}
            </div>

        </div>
        <div className='InputComment'>
            <div>
                 <img src={
                  user.profilePicture
                    ? serverPublic + user.profilePicture
                    : serverPublic + "profildefault.jpg"
                } alt="profile" />
                <input required type="text" placeholder='Commentez ce post'/>
            </div>
        </div>
    </div>
  )
}

export default Post