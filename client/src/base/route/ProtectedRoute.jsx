import { Navigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';

const ProtectedRoute = ({ children, allowedRoles, path }) => {
  const authService = new AuthService();
  const token = authService.getToken();
  const userRole = authService.getRole();
  if (!path.startsWith('/register') && (!token || (allowedRoles && !allowedRoles.includes(userRole))))
    return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;
