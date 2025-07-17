import axios from "axios";
import {API_BASE_URL} from "../config.js";
const instance = axios.create({
  baseURL: __API_BASE_URL__,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default instance;
