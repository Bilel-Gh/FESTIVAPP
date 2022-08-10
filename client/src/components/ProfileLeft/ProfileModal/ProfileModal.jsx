import React, { useState } from "react";
import { Modal, useMantineTheme } from '@mantine/core';
import "./ProfileModal.scss"

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadImage } from "./../../../actions/uploadAction.js";
import { updateUser } from "./../../../actions/UserAction.js";

function ProfileModal({modalOpened, setModalOpened, data}) {
  const theme = useMantineTheme();
  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const param = useParams();

  const { user } = useSelector((state) => state.authReducer.authData);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      event.target.name === "profilePicture"
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  };

  // form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    let UserData = formData;
    if (profileImage) {
      const data = new FormData();
      const fileName = Date.now() + profileImage.name;
      data.append("name", fileName);
      data.append("file", profileImage);
      UserData.profilePicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    if (coverImage) {
      const data = new FormData();
      const fileName = Date.now() + coverImage.name;
      data.append("name", fileName);
      data.append("file", coverImage);
      UserData.coverImage = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    dispatch(updateUser(param.id, UserData));
    setModalOpened(false);
  };


  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      size="45%"
      opened = {modalOpened}
      onClose = {() => setModalOpened(false)}
    >
      <form className="infoForm" onSubmit={handleSubmit}>
        <h3>Vos Information</h3>

        <div>
            <div>
                <label htmlFor="">Prénom</label>
                <input 
                    type="text" 
                    className="infoInput" 
                    name="firstname" 
                    placeholder='Prénom'
                    onChange={handleChange}
                    value={formData.firstname}
                />
            </div>
            <div>
                <label htmlFor="">Nom</label>
                <input 
                    type="text" 
                    className="infoInput" 
                    name="lastname" 
                    placeholder='Nom'
                    onChange={handleChange}
                    value={formData.lastname}
                />
            </div>
        </div>
        <div>
            <div>
                <label htmlFor="">Metier</label>
                <input 
                    type="text" 
                    className="infoInput" 
                    name="job" 
                    placeholder='Metier'
                    onChange={handleChange}
                    value={formData.job}
                />
            </div>
            <div>
                <label htmlFor="">Ville</label>
                <input 
                    type="text" 
                    className="infoInput" 
                    name="ville" 
                    placeholder='Ville'
                    onChange={handleChange}
                    value={formData.ville}
                />
            </div>
        </div>
        <div>
            <div>
                <label htmlFor="">Age</label>
                <input 
                    type="text" 
                    className="infoInput" 
                    name="age" 
                    placeholder='Age'
                    onChange={handleChange}
                    value={formData.age}
                />
            </div>
            <div>
                <label htmlFor="">Festival préféré</label>
                <input 
                    type="text" 
                    className="infoInput" 
                    name="festivFav" 
                    placeholder='Festival préféré'
                    onChange={handleChange}
                    value={formData.festivFav}
                />
            </div>
        </div>
        <div className='changeFile'>
            <label htmlFor=""><b>Image de profil</b></label>
            <input type="file" name='profilePicture' onChange={onImageChange}/>
            <label htmlFor=""><b>Image de couverture</b></label>
            <input type="file" name='coverImage' onChange={onImageChange} />
        </div>

        <button className='btn btn-primary' onClick={handleSubmit} type="submit" >Modifier</button>
      </form>
    </Modal>
  );
}

export default ProfileModal