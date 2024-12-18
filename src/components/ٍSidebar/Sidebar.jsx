
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import style from '../ٍSidebar/Sidebar.module.css';
import axios from "axios";

export default function Sidebar() {
  const [name, setName] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setLoading(true);
      axios.get(`http://localhost/backend/fetch_user.php?id=${userId}`)
        .then((response) => {
          setName(response.data.name)
          setLoading(false)
        })
        .catch((err) => {
          console.log(err);
          setLoading(false)
        });
    }

  }, []);
  return (
    <div
      className={`bg-dark text-white position-fixed h-100 d-flex flex-column align-items-center pt-5`}
      style={{
        width: "250px",
        boxShadow: "5px 0 10px rgba(112, 206, 35, 0.527)",
        borderRadius: "0 20px 20px 0",
        overflow: "hidden",
      }}
    >
      <div style={{
        padding: "10px", boxShadow: "0 4px 6px var(--main-color)",
        marginBottom: "10px",
      }}
      >
        <h2
          style={{
            fontSize: "1.6rem",
            fontWeight: "bold",
            letterSpacing: "1px",
            textAlign: "center"
          }}
        >
          Welcome {loading ? <div class="spinner-border text-success" role="status">
            <span class="sr-only">Loading...</span>
          </div> : <span style={{ color: "var(--main-color)", }}>{name}</span>}
        </h2>

      </div>

      <ul className="nav flex-column w-100  pt-5 ps-3">
        <li className="nav-item mb-3">
          <NavLink
            to="/Dashboard"
            className={`nav-link d-flex align-items-center ${style.links}`}
          >
            <i className="bi bi-grid fs-5 me-3"></i>
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li className="nav-item mb-3">
          <NavLink
            to="/Calender"
            className={`nav-link d-flex align-items-center ${style.links}`}
          >
            <i className="bi bi-calendar3 fs-5 me-3"></i>
            <span>Calendar</span>
          </NavLink>
        </li>

        <li className="nav-item mb-3">
          <NavLink
            to="/users"
            className={`nav-link d-flex align-items-center ${style.links}`}
          >
            <i className="bi bi-people fs-5 me-3"></i>
            <span>Customers</span>
          </NavLink>
        </li>
        <li className="nav-item mb-3">
          <NavLink
            to="/contract"
            className={`nav-link d-flex align-items-center ${style.links}`}
          >
            <i class="bi bi-people fs-5 me-3"></i>
            {isSidebarOpen && <span>contract</span>}
          </NavLink>
        </li>
        <li className="nav-item mb-3">
          <NavLink
            to="/messages"
            className={`nav-link d-flex align-items-center ${style.links}`}
          >
            <i class="bi bi-chat-dots fs-5 me-3"></i>
            <span>Messages</span>
          </NavLink>
        </li>
        <li className="nav-item mb-3">
          <NavLink
            to="/tasks"
            className={`nav-link d-flex align-items-center ${style.links}`}
          >
            <i className="bi bi-clipboard-check fs-5 me-3"></i>
            <span>Tasks</span>
          </NavLink>
        </li>
        <li className="nav-item mb-3">
          <NavLink
            to="/settings"
            className={`nav-link d-flex align-items-center ${style.links}`}
          >
            <i className="bi bi-gear-fill fs-5 me-3"></i>
            <span>Settings</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

