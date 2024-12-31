// import React, { useState, useEffect } from "react";
// import { Outlet, useNavigate } from "react-router-dom";
// import style from "../Navbar/Navbar.module.css";
// import image1 from "../images/image 1.png";
// import { toast } from "react-toastify";
// import Sidebar from "../Sidebar/Sidebar";

// export default function Navbar() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   useEffect(() => {
//     const reSizeNav = () => {
//       if (window.innerWidth <= 768) {
//         setIsSidebarOpen(false);
//       }
//     };

//     // Add event listener
//     window.addEventListener("resize", reSizeNav);

//     // Cleanup the event listener when the component is unmounted
//     return () => {
//       window.removeEventListener("resize", reSizeNav);
//     };
//   }, []); // Empty dependency array ensures this effect runs once on mount and cleans up on unmount

//   const navigate = useNavigate();

//   const userLogout = () => {
//     localStorage.removeItem("role");
//     localStorage.removeItem("userId");
//     localStorage.removeItem("token");
//     toast.success("You are logged out successfully!", {
//       position: "top-center",
//       autoClose: 2000
//     });
//     navigate("/");
//   };

//   return (
//     <>
//       <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

//       <div
//         className="flex-grow-1"
//         style={{
//           marginLeft: isSidebarOpen ? "250px" : "70px",
//           transition: "margin-left 0.3s ease-in-out",
//           maxWidth: "100%",
//           overflowX: "overflow"
//         }}
//       >
//         <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
//           <div className="container d-flex justify-content-between align-items-center">
//             <div className="one">
//               <img src={image1} alt="Logo" />
//             </div>

//             <button
//               className="navbar-toggler"
//               type="button"
//               data-bs-toggle="collapse"
//               data-bs-target="#navbarNav"
//               aria-controls="navbarNav"
//               aria-expanded="false"
//               aria-label="Toggle navigation"
//             >
//               <span className="navbar-toggler-icon"></span>
//             </button>

//             <div className="collapse navbar-collapse" id="navbarNav">
//               <div className={`ms-auto ${style.buttons}`}>
//                 <button
//                   onClick={userLogout}
//                   className="btn"
//                   style={{
//                     backgroundColor: "var(--main-color)",
//                     borderRadius: "25px"
//                   }}
//                 >
//                   <i className="bi bi-box-arrow-left pe-2 fw-bold"></i> Logout
//                 </button>
//               </div>
//             </div>
//           </div>
//         </nav>

//         <div className="p-1">
//           <Outlet />
//         </div>
//       </div>
//     </>
//   );
// }

import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import style from "../Navbar/Navbar.module.css";
import image1 from "../images/image 1.png";
import { toast } from "react-toastify";
import Sidebar from "../Sidebar/Sidebar";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const [marginLeft, setMarginLeft] = useState('70px');
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const reSizeNav = () => {
      if (window.innerWidth >= 768 && isSidebarOpen) {
        setMarginLeft('250px');
      } else if (window.innerWidth < 768 && !isSidebarOpen) {
        setMarginLeft('70px');

      } else {
        setMarginLeft('70px');
      }
    };

    // إضافة مستمع للأحداث عند تغيير حجم النافذة
    window.addEventListener('resize', reSizeNav);

    // استدعاء الدالة مرة واحدة عند التحميل الأولي
    reSizeNav();
    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", reSizeNav);
    };
  }, [isSidebarOpen]); // Empty dependency array ensures this effect runs once on mount and cleans up on unmount

  const navigate = useNavigate();

  const userLogout = () => {
    localStorage.clear(); // Clear all local storage
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
        className="flex-grow-1 navbar-ml"
        style={{
          marginLeft: marginLeft,
          transition: 'margin-left 0.3s ease-in-out',
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
                  onClick={userLogout}
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

