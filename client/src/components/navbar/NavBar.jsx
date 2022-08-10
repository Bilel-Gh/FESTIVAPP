import React from 'react'
import "./NavBar.scss"
import profileImage from "../../img/default2.jpg"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./../../actions/AuthAction";

const NavBar = () => {
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.authReducer.authData);
    const handleLogOut = ()=> {
        dispatch(logout())
      }
  return (
    <nav>
        <div className="container"> 
        <h1 className="logo">
            <Link style={{ textDecoration: "none", color: "inherit" }} to="/">
                Festiv'App
            </Link>
        </h1>
        <div className="search-bar">
            <i className="uil uil-search"></i>
            <input type="search" placeholder="Cherchez un Festivalier"/>
        </div>
        <div className="logout">
            <button onClick={handleLogOut} className='btn btn-primary' htmlFor="create-post"> {user ? "Déconnexion" : ""}</button>
            <div className="profile-picture">
            <img src={
                  user.profilePicture
                    ? serverPublic + user.profilePicture
                    : serverPublic + "profildefault.jpg"
                } alt="profile" />
            </div>
        </div>
        </div>
  </nav>
  )
}

export default NavBar