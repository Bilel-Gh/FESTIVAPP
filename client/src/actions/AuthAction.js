import toast from 'react-hot-toast';
import * as AuthApi from '../api/AuthRequests';

export const logIn = (formData) => async (dispatch) => {
    dispatch({type: 'AUTH_START'});
    try {
        const { data } = await AuthApi.logIn(formData);
        dispatch({ type: "AUTH_SUCCESS", data: data });
        toast.success("Vous êtes connecté")
    } catch (error) {
        toast.error(error.response.data.message);
        dispatch({type: 'AUTH_FAIL', error: error});
        toast.error(error.response.data.message);
    }
}

export const signUp = (formData) => async (dispatch) => {
    dispatch({type: 'AUTH_START'});
    try {
        const {data} = await AuthApi.signUp(formData);
        dispatch({type: 'AUTH_SUCCESS', data: data});
        toast.success("Vous êtes inscrit")
    } catch (error) {
        toast.error(error.response.data.message ? error.response.data.message : "Erreur lors de l'inscription");
        dispatch({type: 'AUTH_FAIL', error: error});
    }
}

export const logout = ()=> async(dispatch)=> {
    dispatch({type: "LOG_OUT"})
  }