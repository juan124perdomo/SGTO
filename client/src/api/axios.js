import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + "/api", // Usamos la variable del .env
  withCredentials: true,
});

export default instance;
