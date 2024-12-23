import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://gapi.testpuzzle.ge:8080",
    headers: {
        'Content-Type': 'application/json',
    },
})

export const baseUrl = 'http://gapi.testpuzzle.ge:8080'