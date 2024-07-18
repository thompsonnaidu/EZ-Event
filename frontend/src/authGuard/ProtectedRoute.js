import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/auth/authContext';


export const ProtectedRoute = ({ children }) => {
    const {authData}=useAuth();
  if (!authData.isAuthenticated) {
   return <Navigate to="/login" replace />;
    }
  return children;
  };