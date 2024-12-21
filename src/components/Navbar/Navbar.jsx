
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import style from "../Navbar/Navbar.module.css";
import image1 from '../images/image 1.png';
import { toast } from "react-toastify";
import Sidebar from "../ٍSidebar/Sidebar";

export default function Navbar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const navigate = useNavigate();

    const userLogout = () => {
        localStorage.removeItem("role");
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        toast.success("You are logged out successfully!", {
            position: "top-center",
            autoClose: 2000,
        });
        navigate("/");
    };

    return (
        <>
            <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <div
                className="flex-grow-1"
                style={{
                    marginLeft: isSidebarOpen ? "250px" : "70px",
                    transition: "margin-left 0.3s ease-in-out",
                    maxWidth: "100%",
                    overflowX: "hidden",
                }}
            >
                <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
                    <div className="container d-flex justify-content-between align-items-center">
                        <div className="one">
                            <img src={image1} alt="Logo" />
                        </div>

                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarNav">
                            <div className={`ms-auto ${style.buttons}`}>
                                <button
                                    onClick={() => userLogout()}
                                    className="btn"
                                    style={{
                                        backgroundColor: "var(--main-color)",
                                        borderRadius: "25px",
                                    }}
                                >
                                    <i className="bi bi-box-arrow-left pe-2 fw-bold"></i> Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>

                <div className="p-1">
                    <Outlet />
                </div>
            </div>
        </>
    );
}
