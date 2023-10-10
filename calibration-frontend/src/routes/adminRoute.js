import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const PrivateRoute = ({ children, requiredRole }) => {
    const { user } = useAuthContext();

    return (
        user && user.role === requiredRole ? (
            children
        ) : (
            <Navigate to="/" replace />
        )
    );
};

export default PrivateRoute;
