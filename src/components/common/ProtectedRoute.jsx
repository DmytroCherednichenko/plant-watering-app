import { Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';

const ProtectedRoute = ({ children, requireAuth = true, redirectTo = "/login" }) => {
    const location = useLocation();
    const isAuth = localStorage.getItem("authToken");
    const { currentUser } = useContext(AuthContext);
    
    // If route requires authentication but user is not authenticated
    if (requireAuth && !isAuth) {
        // Save the attempted location for redirecting after login
        return <Navigate to={redirectTo} state={{ from: location }} replace />;
    }
    
    // If route requires NO authentication (like login page) but user IS authenticated
    if (!requireAuth && isAuth) {
        // Redirect authenticated users away from login page
        const from = location.state?.from?.pathname || '/myplants';
        return <Navigate to={from} replace />;
    }
    
    // User has the correct authentication status, render the component
    return children;
};

export default ProtectedRoute;