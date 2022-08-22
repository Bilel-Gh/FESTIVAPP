import React, {useEffect, useState} from 'react'
import toast from 'react-hot-toast'
import "./Auth.scss"
import { useDispatch, useSelector } from 'react-redux'
import { logIn, signUp } from '../../actions/AuthAction'

const Auth = () => {
    const dispatch = useDispatch()
    const loading = useSelector(state => state.authReducer.loading)
    const [isSignUp, setIsSignUp] = React.useState(false)
    const [chargement, setChargement] = React.useState(false)
    const [data, setData] = useState({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        confirmpass : ""
    })

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const [confirmPass, setConfirmPass] = useState(true)

    const handleSubmit = (e) => {
     e.preventDefault();
     setChargement(true);
     if(isSignUp){
       if(data.password !== data.confirmpass){
         setConfirmPass(false)
         setChargement(false);
         toast.error("La confirmation de mot de passe ne correspond pas")
        } else{
          dispatch(signUp(data))
        }
      } else {
        dispatch(logIn(data))
     }
      
    }

    const resetForm = () => {
      setConfirmPass(true);
      setData({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        confirmpass : ""
      })
    }


  return (
    <div className="Auth">
      {/* // ────────────────────────────────LEFT SIDE───────────────────────────────── */}
      <div className="a-left">
        <h1>Festiv'App</h1>
        <h5>Le réseau social pour les passionnés de festivals</h5>
      </div>

      {/* <SignUp/> */}

      {/* // ────────────────────────────────RIGHT SIDE───────────────────────────────── */}

      <div className="a-right">
        <form className={isSignUp ? "infoForm authForm" : "infoForm login"} onSubmit={handleSubmit} >
          <h3>{isSignUp ? "Inscription" : "Connexion"}</h3>
          <div>
            {isSignUp && (
              <>
                <div>
                  <label htmlFor="">Prénom</label>
                  <input
                    type="text"
                    placeholder="Prénom"
                    className="infoInput"
                    name="firstname"
                    onChange={handleChange}
                    value={data.firstname}
                  />
                </div>
                <div>
                  <label htmlFor="">Nom</label>
                  <input
                    type="text"
                    placeholder="Nom"
                    className="infoInput"
                    name="lastname"
                    onChange={handleChange}
                    value={data.lastname}
                  />
                </div>
              </>
            )}
          </div>
          <div>
            {isSignUp && (
              <>
                <div>
                  <label htmlFor="">Pseudo</label>
                  <input
                    type="text"
                    className="infoInput"
                    placeholder="Pseudo"
                    name="username"
                    onChange={handleChange}
                    value={data.username}
                  />
                </div>
              </>
            )}
            <div>
              <label htmlFor="">Email</label>
              <input
                type="email"
                className="infoInput"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={data.email}
              />
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="">Mot de passe</label>
              <input
                type="password"
                className="infoInput"
                placeholder="Mot de passe"
                name="password"
                onChange={handleChange}
                value={data.password}
              />
            </div>
            {isSignUp && (
              <>
                <div>
                  <label htmlFor="">Confirmation de mot de passe</label>
                  <input
                    type="password"
                    className="infoInput"
                    placeholder="Confirmer le mot de passe"
                    name="confirmpass"
                    onChange={handleChange}
                    value={data.confirmpass}
                  />
                </div>
              </>
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            {chargement ? "Connexion en cours" : isSignUp ? "Inscription" : "Connexion"}
          </button>
          <div className='redirection'>
            <span >
            {!isSignUp ? ("Vous n'avez pas de compte ?") :   ("Vous avez déjà un compte ?")}
            </span>
            <span className='btn' onClick={() => {setIsSignUp((prev)=> !prev); resetForm()} } > 
              {!isSignUp ? "Inscrivez vous." :   "Connectez vous."}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Auth
