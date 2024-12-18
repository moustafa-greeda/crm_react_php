import React from "react";
import "./Dashboard.css";
<<<<<<< HEAD

const Dashboard = () => {
  return (
=======
import Chart from "./chart";

const Dashboard = () => {

  return (
  <>
>>>>>>> 4349cf8b4c4f9cbfd5b24f5d5bfbfdfead8c0697
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
<<<<<<< HEAD
  );
=======
    <Chart/>
  </>
    
  );

>>>>>>> 4349cf8b4c4f9cbfd5b24f5d5bfbfdfead8c0697
};

export default Dashboard;
