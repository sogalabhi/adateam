// src/pages/auth/protectedroute.jsx
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../../../supabaseClient'; // Ensure this path is correct

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      console.log("Session:", session);  // Log session data

      if (!session) {
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    // Optional: Show a loading spinner or loader while checking authentication
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // If not authenticated, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // Prevent logged-in users from accessing login or register page
  if (isAuthenticated) {
    const currentPath = window.location.pathname;
    if (currentPath === "/Login" || currentPath === "/Register") {
      return <Navigate to="/" replace />;
    }
  }

  // If authenticated, render the children (protected components)
  return children;
};

export default ProtectedRoute;

