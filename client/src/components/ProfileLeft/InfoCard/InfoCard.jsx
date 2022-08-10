import "./InfoCard.scss"
import ProfileModal from "./../ProfileModal/ProfileModal"
import React, { useEffect, useState } from "react";
import "./InfoCard.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as UserApi from "../../../api/UserRequests.js";
import { logout } from "../../../actions/AuthAction";

const InfoCard = () => {
    const dispatch = useDispatch()
    const params = useParams();
    const [modalOpened, setModalOpened] = useState(false);
    const profileUserId = params.id;
    const [profileUser, setProfileUser] = useState({});
    const { user } = useSelector((state) => state.authReducer.authData);

    const handleLogOut = ()=> {
        dispatch(logout())
      }
    
    
      useEffect(() => {
        const fetchProfileUser = async () => {
          if (profileUserId === user._id) {
            setProfileUser(user);
          } else {
            console.log("fetching")
            const profileUser = await UserApi.getUser(profileUserId);
            setProfileUser(profileUser);
          }
        };
        fetchProfileUser();
      }, [user]);
    
  return (
    <div className="InforCard">
        <div className="infoHead">
            <h4>Vos informations</h4>
            {user._id === profileUserId ? (
            <div>
                <i className="uil uil-edit-alt" onClick={()=>setModalOpened(true)} ></i>
                <ProfileModal modalOpened={modalOpened} setModalOpened={setModalOpened} data = {user}/>
            </div> ) : ( <div></div> )}
        </div>

        <div className="info">
            <span>
                <b>Metier : </b>
                <span>{profileUser.job}</span>
            </span>
        </div>
        <div className="info">
            <span>
                <b>Ville : </b>
                <span>{profileUser.ville}</span>
            </span>
        </div>
        <div className="info">
            <span>
                <b>Age : </b>
                <span>{profileUser.age ? profileUser.age + " ans" : "" } </span>
            </span>
        </div>
        <div className="info">
            <span>
                <b>Festival préféré : </b>
                <span>{profileUser.festivFav}</span>
            </span>
        </div>

        <button onClick={handleLogOut} className='btn btn-primary'>Déconnexion</button>
    </div>
  )
}

export default InfoCard