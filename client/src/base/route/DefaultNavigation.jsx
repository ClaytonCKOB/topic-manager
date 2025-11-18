import { Navigate } from "react-router-dom";
import AuthService from "../../services/AuthService";

const DefaultNavigation = () => {
    const authService = new AuthService();
    const token = authService.getToken();

    if (authService.isTokenValid(token) === false) {
        return <Navigate to="/login" />;
    }

    const userRole = authService.getRole();

    switch (userRole) {
        case 'ADMIN': return <Navigate to="/home" />;
        case 'USER': return <Navigate to="/home" />;
        case 'CHEFE': return <Navigate to="/home" />;
        default: return <Navigate to="/login" />;
    }
};

export default DefaultNavigation;