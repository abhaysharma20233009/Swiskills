import React, { createContext, useContext, useState } from 'react';
import { isLoggedIn as apiIsLoginIn} from './api/login'; // Import your API functions

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Initial authentication state
    console.log(children);
    const login = async (email, password) => {
        console.log("use huha he");
        const result = await apiIsLogin(email, password); // Call the login API
        console.log(result);
        if (result) {
            setIsAuthenticated(true); // Change state to authenticated on successful login
        }
    };

    const logout = async () => {
        const result = await apiLogout(); // Call the logout API
        if (result) {
            setIsAuthenticated(false); // Change state to unauthenticated on successful logout
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext); // Custom hook to access auth context
};
