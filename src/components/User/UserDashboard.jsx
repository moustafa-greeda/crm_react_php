import React, { useState, useEffect } from "react";
import '../User/userDashboard.css'
const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  // Dynamically retrieve userId (e.g., from localStorage)
  const userId = localStorage.getItem("userId"); // Assumes you store userId in localStorage after login

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userId) {
          throw new Error("User ID is not available. Please log in.");
        }

        const response = await fetch(
          `http://localhost/backend/fetch_user.php?id=${userId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();

        // Check if user role is 'user'
        if (data.role === "user") {
          setUserData(data);
        } else {
          setError("Access Denied: Only users with role 'user' can view this page.");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div>
      {error ? (
        <h2 style={{ color: "red" }}>{error}</h2>
      ) : userData ? (
        <>
          <h1 className="fs-3 mb-2">
            Welcome <span className="highlight">{userData.name.split(" ")[0]}!</span>
          </h1>
          <h2 className="mt-4 fw-bold">Personal Information</h2>
          <div className="personal-info-container mt-2">
            <div className="info-item">
              <i className="fa-solid fa-user icon"></i>
              <div>
                <h4>Name</h4>
                <p>{userData.name}</p>
              </div>
            </div>
            <div className="info-item">
            <i className="fa-solid fa-envelope icon"></i>
            <div>
                <h4>Email</h4>
                <p>{userData.email}</p>
              </div>
            </div>
            <div className="info-item">
            <i class="fa-solid fa-phone icon"></i>
              <div>
                <h4>Phone Number</h4>
                <p>{userData.phone}</p>
              </div>
            </div>
            <div className="info-item">
            <i class="fa-solid fa-circle-info icon"></i>            
            <div>
                <h4>Role</h4>
                <p>{userData.role}</p>
              </div>
            </div>
          </div>
          
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserDashboard;
