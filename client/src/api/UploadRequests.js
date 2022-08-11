import axios from 'axios'


// const API = axios.create({ baseURL: "http://localhost:5000" });
const API = axios.create({ baseURL: "https://festiv-app-online.herokuapp.com/" });

export const uploadImage = (data) => API.post('/upload', data);

export const uploadPost = (data) => API.post('/post', data);