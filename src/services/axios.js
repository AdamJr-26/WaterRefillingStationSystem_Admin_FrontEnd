import Axios from "axios";

const axiosAPI = () => {
  const usertoken = localStorage.getItem("userToken");
  return Axios.create({
    baseURL: "http://localhost:4000",
    headers: { "Content-Type": "application/json", Authorization: usertoken },
    withCredentials: true,
  });
};

export default axiosAPI;
