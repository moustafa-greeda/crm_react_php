
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import style from '../ٍSidebar/Sidebar.module.css';
import axios from "axios";
export default function Sidebar({ isSidebarOpen, toggleSidebar }) {
  const [name, setName] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setLoading(true);
      axios
        .get(`http://localhost/backend/fetch_user.php?id=${userId}`)
        .then((response) => {
          setName(response.data.name);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, []);

  return (
    <div
      className={`bg-dark text-white position-fixed h-100 d-flex flex-column ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"
        }`}
      style={{
        width:isSidebarOpen ? "250px" : "70px",
        boxShadow: isSidebarOpen
          ? "5px 0 10px rgba(112, 206, 35, 0.527)"
          : "none",
        transition: "width 0.3s ease-in-out",
        borderRadius: "0 20px 20px 0",
        overflow: "hidden",
      }}
    >
      <div className="d-flex flex-column align-items-center py-3">
        <button
          className="btn btn-light"
          onClick={toggleSidebar}
          style={{ borderRadius: "50%", transition: "all 0.3s ease-in-out" }}
        >
          {isSidebarOpen ? (
            <i className="bi bi-arrow-left"></i>
          ) : (
            <i className="bi bi-list"></i>
          )}
        </button>
      </div>
      <div style={{
        padding: "10px", boxShadow: "0 4px 6px var(--main-color)",
        marginBottom: "10px",
      }}>
        {loading ? (
          <div className="spinner-border text-success" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          isSidebarOpen && (
            <h2 style={{
              fontSize: "1.3rem",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              
            }}>
              Welcome  <span className="ps-2" style={{ color: "var(--main-color)", }}>{name?name.split(" ")[0]:"no name"}</span>
            </h2>
          )
        )}
      </div>


      <ul className="nav flex-column w-100 pt-1">
        <li className="nav-item ">
          <NavLink
            to="/dashboard"
            className={`nav-link d-flex align-items-center ${style.links}`}
          >
            <i className="bi bi-grid fs-5 me-3"></i>
            {isSidebarOpen && <span>Dashboard</span>}
          </NavLink>
        </li>
        <li className="nav-item ">
          <NavLink
            to="/calender"
            className={`nav-link d-flex align-items-center ${style.links}`}
          >
            <i class="bi bi-calendar3 fs-5 me-3"></i>
            {isSidebarOpen && <span>Calendar</span>}
          </NavLink>
        </li>

        <li className="nav-item ">
          <NavLink
            to="/users"
            className={`nav-link d-flex align-items-center ${style.links}`}
          >
            <i class="bi bi-people fs-5 me-3"></i>
            {isSidebarOpen && <span>Customers</span>}
          </NavLink>
        </li>
        <li className="nav-item ">
          <NavLink
            to="/contract"
            className={`nav-link d-flex align-items-center ${style.links}`}
          >
            <i class="bi bi-file-earmark-text fs-5 me-3"></i>
            {isSidebarOpen && <span>Contract</span>}
           
          </NavLink>
        </li>
        <li className="nav-item ">
          <NavLink
            to="/messages"
            className={`nav-link d-flex align-items-center ${style.links}`}
          >
            <i class="bi bi-chat-dots fs-5 me-3"></i>
            {isSidebarOpen && <span>Messages</span>}
          </NavLink>
        </li>
        <li className="nav-item ">
          <NavLink
            to="/tasks"
            className={`nav-link d-flex align-items-center ${style.links}`}
          >
            <i className="bi bi-clipboard-check fs-5 me-3"></i>
            {isSidebarOpen && <span>Tasks</span>}
          </NavLink>
        </li>
        <li className="nav-item ">
          <NavLink
            to="/settings"
            className={`nav-link d-flex align-items-center ${style.links}`}
          >
            <i class="bi bi-gear-fill fs-5 me-3"></i>
            {isSidebarOpen && <span>Settings</span>}
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
