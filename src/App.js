// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Root from "./components/Root/Root";
// import Login from "./components/Auth/Login/Login";
// import Register from "./components/Auth/Register/Register";
// import Dashboard from "./components/Dashboard/Dashboard";
// import DragAndDropColumns from "./pages/Tasks/Tasks";
// import Settings from "./components/Settings/Settings";
// import Users from "./components/Customer/User";
// import UserDashboard from "./components/User/UserDashboard";
// import Messages from "./components/Messages/Messages";
// import Calender from "./components/Calender/Calender";
// import Contracts from "./components/contract/contract";
// import Invoices from "./components/Invoices/Invoice";

// function App() {
//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <Root />,
//       children: [
//         { path: "/tasks", element: <DragAndDropColumns /> },
//         { path: "/Dashboard", element: <Dashboard /> },
//         { path: "/user-dashboard", element: <UserDashboard /> },
//         { path: "/users", element: <Users /> },
//         { path: "/messages", element: <Messages /> },
//         { path: "/settings", element: <Settings /> },
//         { path: "/Auth/Login", element: <Login /> },
//         { path: "/Calender", element: <Calender /> },
//         { path: "/contract", element: <Contracts /> },
//         { path: "/invoices", element: <Invoices /> }
//       ]
//     },
//     {
//       path: "/register",
//       element: <Register />
//     },
//     {
//       index: true,
//       element: <Login />
//     },
//     {
//       path: "/register",
//       element: <Register />
//     }
//   ]);

//   return (
//     <>
//       <RouterProvider router={router} />
//     </>
//   );
// }

// export default App;
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./components/Root/Root";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import DragAndDropColumns from "./pages/Tasks/Tasks";
import Settings from "./components/Settings/Settings";
import Users from "./components/Customer/User";
import UserDashboard from "./components/User/UserDashboard";
import Messages from "./components/Messages/Messages";
import Calender from "./components/Calender/Calender";
import Contracts from "./components/contract/contract";
import Invoices from "./components/Invoices/Invoice";
import PageNotFound from "./components/PageNotFound"; // Import the PageNotFound component

function App() {
  // الحصول على الدور من الـ localStorage أو السياق (Context)
  const role = localStorage.getItem("role");

  // تعريف الـ routes المشتركة بين الـ admin والـ user
  const commonRoutes = [
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/tasks", element: <DragAndDropColumns /> },
    { path: "/messages", element: <Messages /> },
    { path: "/Calender", element: <Calender /> },
    { path: "/settings", element: <Settings /> }
  ];

  // تعريف الـ routes الخاصة بالـ admin
  const adminRoutes = [
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/users", element: <Users /> },
    { path: "/contract", element: <Contracts /> }
  ];

  // تعريف الـ routes الخاصة بالـ user
  const userRoutes = [{ path: "/user-dashboard", element: <UserDashboard /> }];

  // إنشاء الـ router بناءً على الدور
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        ...commonRoutes, // إضافة الـ routes المشتركة
        ...(role === "admin" ? adminRoutes : userRoutes) // إضافة الـ routes حسب الدور
      ]
    },
    {
      path: "/register",
      element: <Register />
    },
    {
      index: true,
      element: <Login />
    },
    {
      path: "*", // Catch-all route for 404
      element: <PageNotFound /> // Display the PageNotFound component
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
