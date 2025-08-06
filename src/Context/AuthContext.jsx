import { useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate();

    const [currentUser, setCurrentUser] = useState(null);

    const login = (username) => {
        const token = `fake-token-${username}`
        localStorage.setItem('authToken', token);
        setCurrentUser(username);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setCurrentUser(null);
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );

};