import axios from "axios";

const api = axios.create({
  baseURL: "https://minify-backend-hlll.onrender.com/api",
  withCredentials: true,
});

export default api;
