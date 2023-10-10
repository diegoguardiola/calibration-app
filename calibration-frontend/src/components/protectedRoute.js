import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext'; // Import your auth context hook

const ProtectedRoute = ({ children }) => {
  const { user } = useAuthContext(); // Access user from context

  console.log(user);

  if (!user || user.role !== 'admin') {
    // If user is not admin, navigate to the "not-authorized" page
    return <Navigate to="/calibration" replace />;
  }
  
  // If user is admin, render children
  return <>{children}</>;
};

export default ProtectedRoute