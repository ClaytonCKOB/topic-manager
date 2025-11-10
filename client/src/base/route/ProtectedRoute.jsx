import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles, path }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('user_role');
  if (!path.startsWith('/register') && (!token || (allowedRoles && !allowedRoles.includes(userRole))))
    return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;
