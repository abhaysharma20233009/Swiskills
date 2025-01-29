// src/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './authContext';

const ProtectedRoutes = ({ element }) => {
    const { isAuthenticated } = useAuth();
    console.log(isAuthenticated);
    console.log(element);
    return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoutes;
