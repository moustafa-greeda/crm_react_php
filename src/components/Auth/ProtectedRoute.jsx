import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from './useAuth';

const ProtectedRoute = () => {
  const isAuthenticated = useAuth();
  console.log("ProtectedRoute isAuthenticated:", isAuthenticated); // Debugging statement

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;