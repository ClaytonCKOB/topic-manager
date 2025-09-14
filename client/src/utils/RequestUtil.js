import axios from "axios";
import AuthService from "../services/AuthService";
import { BASE_URL } from "./ApiUrl";

const authService = new AuthService();

const request = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

request.interceptors.request.use((config) => {
    const token = authService.getToken();
    
    if (authService.isTokenValid(token)) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        authService.setToken(null);
        window.location.href = "/login";
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});


export default request;
