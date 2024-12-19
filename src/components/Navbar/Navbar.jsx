import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import style from '../Navbar/Navbar.module.css'
import image1 from '../images/image 1.png'
export default function Navbar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    return (
        <>
            <div
                className="flex-grow-1"
                style={{
                    marginLeft: isSidebarOpen ? "250px" : "70px",
                    transition: "margin-left 0.3s",
                }}
            >
                <nav className="navbar navbar-expand-lg navbar-light bg-light shadow ">
                    <div className="container  d-flex justify-content-between align-items-center">
                        <div className="one">
                        <img src={image1} alt="" className="tw-w-40" />
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
                        <div className="collapse navbar-collapse " id="navbarNav">
                           
                            <div className={` ms-auto ${style.buttons}`}>
                                <Link className="btn" style={{"backgroundColor":"var(  --main-color)","borderRadius":"25px"}}>
                                <i className="bi bi-box-arrow-left pe-2 fw-bold"></i> Logout
                                </Link>

                              


                            </div>
                        </div>
                    </div>
                </nav>
               

                <div className="p-4 tw-bg-base-200">
                    <Outlet></Outlet>
                </div>
            </div>
        </>
    )
}
