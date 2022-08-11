import axios from 'axios'


// const API = axios.create({ baseURL: "http://localhost:5000" });
const API = axios.create({ baseURL: "https://festiv-app-online.herokuapp.com/" });

export const logIn= (formData)=> API.post('/auth/login',formData);
export const signUp = (formData) => API.post('/auth/register', formData)