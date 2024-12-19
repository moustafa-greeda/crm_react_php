import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ element: Component, requiredRoles, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [userRole, setUserRole] = useState(null);

  
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
            setUserRole(response.data.role); // افترض أن الخادم يعيد الدور
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

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRoles && !requiredRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" />; // أو أي صفحة أخرى لعدم السماح
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;