// PageNotFound.js
import React from "react";

const PageNotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f4f4",
        fontFamily: "Arial, sans-serif",
        textAlign: "center"
      }}
    >
      <div
        style={{
          padding: "20px",
          borderRadius: "10px",
          backgroundColor: "#ff4444",
          color: "#fff",
          maxWidth: "500px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)"
        }}
      >
        <h2>404 - Page Not Found</h2>
        <p>The page you are looking for does not exist.</p>
      </div>
    </div>
  );
};

export default PageNotFound;
