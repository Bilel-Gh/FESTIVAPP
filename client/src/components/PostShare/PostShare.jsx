import React, {useState, useRef} from 'react'
import "./PostShare.scss"
import ProfileImage from "../../img/default2.jpg"
import { Button } from '@mantine/core'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { uploadImage, uploadPost } from '../../actions/uploadAction'

const PostShare = () => {
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
    const loading = useSelector(state => state.postReducer.uploading)
    const dispatch = useDispatch()
    const [image, setImage] = useState(null)
    const imageRef = useRef(null)
    const desc = useRef()
    const fest = useRef()
    const {user} = useSelector((state) => state.authReducer.authData)

    const onImageChange = (event) => {
        if(event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setImage(img);
        }
    } 

    const handleSubmit =  (e) => {
        e.preventDefault();
        const newPost = {
            userId: user._id,
            userInfos: {
                username: user.username,
                profilePicture: user.profilePicture,
                ville: user.ville
            },
            desc: desc.current.value,
            festival: fest.current.value,
        }

        if(image) {
            const data = new FormData();
            const filename = Date.now() + image.name;
            data.append("name", filename);
            data.append("file", image);
            newPost.image = filename;
            try {
                dispatch(uploadImage(data))
            } catch (error) {
                toast.error(error.message)
                console.log(error)
            }
        }
        dispatch(uploadPost(newPost))
        reset()
        toast.success("Post Envoyé")
    }

    const reset = () => {
        setImage(null);
        desc.current.value = "";
        fest.current.value = "";
    }

  return (
    <div className="PostShare">
        <div className='InputShare'>
            <div>
                <img src={
                    user.profilePicture
                        ? serverPublic + user.profilePicture
                        : serverPublic + "profildefault.jpg"
                    } alt="profile" />
                <input ref={desc} required type="text" placeholder='Donnez de vos nouvelles'/>
            </div>
            {/* select festival */}
        </div>

        <div className='formActions'>
            <div className="selectFestival">
                <select ref={fest}>
                    <option value="">Choisissez un festival</option>
                    <option value="Solidays">Solidays</option>
                    <option value="Coachella">Coachella</option>
                    <option value="Tomorrowland">Tomorrowland</option>
                    <option value="Autres">Autres..</option>
                </select>
            </div>
            <button onClick={handleSubmit} className='btn btn-primary' disabled={loading}> {loading ? "Envoie..." : "Envoyer"} </button>
        </div>
            
        <div className="postOptions">
            <div className="option" 
            onClick={() => imageRef.current.click()}
            >
                <i className="uil uil-scenery"></i>
                Photo
            </div>
            <div className="option">
                <i className="uil uil-video"></i>
                Vidéo
            </div>
            <div className="option">
                <i className="uil uil-map"></i>
                Lieu
            </div>
            <div className="option">
                <i className="uil uil-share"></i>
                Partager
            </div>
            <div style={{display: "none"}}>
                <input type="file" name='myImage' ref={imageRef}  onChange={onImageChange} />
            </div>

        </div>
        <div>
            {image && (
                <div className="previewImage">
                    <i onClick={()=>setImage(null)} className="uil uil-times"></i>
                    <img src={URL.createObjectURL(image)} alt="votre image" />
                </div>
            )}
        </div>
    </div>
  )
}

export default PostShare