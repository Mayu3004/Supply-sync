import axios from "axios";

const Instance = axios.create({
    baseURL: 'https://22a6-115-160-223-174.ngrok-free.app/',
    headers: {
        "ngrok-skip-browser-warning": "skip-browser-warning",
      }
    
});

export default Instance