import axios from "axios";


const axiosClient = axios.create({
  baseURL: "https://backend-elgotagota.onrender.com",
  headers: {
    "Content-Type": "application/json"
  }
});

export default axiosClient;
