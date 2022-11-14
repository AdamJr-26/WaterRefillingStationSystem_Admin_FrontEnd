
import Axios from "axios"
const userToken = localStorage.getItem("userToken")

export const axios = Axios.create({
    baseURL: "http://localhost:4000/",
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
})

