import Axios from "axios";

const axiosAPI = () => {
  const usertoken = localStorage.getItem("userToken");
  return Axios.create({
    baseURL: "https://wrss-backend.onrender.com",
    headers: { "Content-Type": "application/json", Authorization: usertoken },
    withCredentials: true,
  });
};

export default axiosAPI;
