import React from "react";
import "./Sidebar.css";
import { FaCalendarAlt, FaUsers, FaEnvelope, FaTasks, FaCog, FaTachometerAlt } from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="logo">
        <img src="logo.png" alt="ZBOOMA Logo" className="logo-image" />
        <span>ZBOOMA</span>
      </div>
      <ul className="menu">
        <li className="menu-item active">
          <FaTachometerAlt className="menu-icon" />
          Dashboard
        </li>
        <li className="menu-item">
          <FaCalendarAlt className="menu-icon" />
          Calendar
        </li>
        <li className="menu-item">
          <FaUsers className="menu-icon" />
          Customers
        </li>
        <li className="menu-item">
          <FaEnvelope className="menu-icon" />
          Messages
        </li>
        <li className="menu-item">
          <FaTasks className="menu-icon" />
          Tasks
        </li>
        <li className="menu-item">
          <FaCog className="menu-icon" />
          Settings
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
