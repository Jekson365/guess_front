import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:3001/",
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
})

export const baseUrl = 'http://127.0.0.1:3001/'