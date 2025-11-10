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

            if (response?.data?.token && response?.data?.role && response?.data?.name) {
                this.setToken(response.data.token);
                this.setRole(response?.data?.role);
                this.setName(response?.data?.name);
                this.setUserId(response?.data?.userId)
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

    register = async (invitation_id, name, username, email, password) => {
        try {
            const response = await axios.post(`${BASE_URL}/api/auth/register-invite`, {
                invitation_id,
                name,
                username,
                email,
                password
            });

            return response;

        } catch (error) {
            console.error("Register failed:", error?.response?.data ?? error.message);
            throw error;
        }
    }

    getToken = () => {
        return localStorage.getItem("token") || sessionStorage.getItem("token");
    }

    setToken = (token) => {
        localStorage.setItem("token", token);
    }

    isTokenValid = (token) => {
        if (!token || token == 'null') return false;
    
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

    setName = (name) => {
        localStorage.setItem("user_name", name);
    }

    getName = () => {
        return localStorage.getItem("user_name");
    }

    setUserId = (userId) => {
        localStorage.setItem("user_id", userId);
    }

    getUserId = () => {
        return localStorage.getItem("user_id");
    }

    isAdmin = () => {
        return localStorage.getItem("user_role") == 'ADMIN';
    }

    logout = () => {
        localStorage.setItem("token", null);
        localStorage.setItem("user_role", null);
        localStorage.setItem("user_name", null);
        localStorage.setItem("user_id", null);
    }
}