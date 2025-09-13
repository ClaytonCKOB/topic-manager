import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { BASE_URL } from "../utils/ApiUrl";


export default class AuthService {
    login = async (username, password) => {
        var response = {};
        try {
            response = await axios.post(`${BASE_URL}/api/auth/login`, {
                username,
                password
            });

            if (response?.data?.token && response?.data?.role) {
                this.setToken(response.data.token);
                this.setRole(response?.data?.role);
            }

            return { status: 200, data: response.data };
          } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            return { 
                status: error.response?.status || 500, 
                data: error.response?.data || error.message || 'An error occurred',
                code: error.code || 'An error occurred'
            };
          }
    }

    getToken = () => {
        return localStorage.getItem("token") || sessionStorage.getItem("token");
    }

    setToken = (token) => {
        localStorage.setItem("token", token);
    }

    isTokenValid = (token) => {
        if (!token) return false;
    
        try {
            const decoded = jwtDecode(token);
            const currentTime = Math.floor(Date.now() / 1000);
            return decoded.exp > currentTime;
        } catch (error) {
            console.error("Invalid token:", error);
            return false;
        }
    };

    setRole = (role) => {
        localStorage.setItem("user_role", role);
    }

    getRole = () => {
        return localStorage.getItem("user_role");
    }

    logout = () => {
        localStorage.setItem("token", null);
        localStorage.setItem("user_role", null);
    }
}