import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1 className="title">Dashboard</h1>
      <div className="stats-container">
        <div className="stat-card">
          <h2>Earnings</h2>
          <p>+28% this week</p>
        </div>
        <div className="stat-card">
          <h2>Contributors</h2>
          <p>-10% this week</p>
        </div>
        <div className="stat-card">
          <h2>Total Customers</h2>
          <p>3,000</p>
        </div>
        <div className="stat-card">
          <h2>Total Staff</h2>
          <p>1,500</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
