import axios from "axios";

const Instance = axios.create({
  
    baseURL: 'https://1240-115-160-223-174.ngrok-free.app/',
    headers: {
        "ngrok-skip-browser-warning": "skip-browser-warning",
        // Authorization: 
      }
    
});
Instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const parsedToken = token ? JSON.parse(token) : null;

  if (token) {
    config.headers.Authorization = `Bearer ${parsedToken}`;
  }
  return config;
});

export default Instance