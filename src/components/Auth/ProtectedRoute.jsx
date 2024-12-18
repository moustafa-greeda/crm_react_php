import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const response = await axios.post(
            "http://localhost/backend/login/verify_token.php",
            { token }
          );
          if (response.data.success) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error("Error verifying token:", error);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    checkToken();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // أو يمكنك عرض مؤشر تحميل
  }

  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/" />;
};

export default ProtectedRoute;
