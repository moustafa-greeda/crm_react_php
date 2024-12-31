
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
import ForgotPassword from "./components/Auth/Login/ForgetPass";
import ResetPassword from "./components/Auth/Login/ResetPass";

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
      path: '/',
      element: <Root />,
      children: [
        { path: "/tasks", element: <DragAndDropColumns /> },
        { path: "/dashboard", element: <Dashboard /> },
        { path: "/user-dashboard", element: <UserDashboard /> },
        { path: "/users", element: <Users /> },
        { path: "/messages", element: <Messages /> },
        { path: "/settings", element: <Settings /> },
        { path: "/Calender", element: <Calender /> },
        { path: "/contract", element: <Contracts /> },
        { path: "/invoices", element: <Invoices /> },
      ]
    },
    {
      path: "/register",
      element: <Register />
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />, // Add ForgotPassword route
    },
    {
      path: "/reset-password/:token", // Route with token as a parameter
      element: <ResetPassword />, // Link to ResetPassword component
    },
    {
      index: true,
      element: <Login />,
    },
    {
      path: "*",
      element: <div className="text-center mt-5"><h1>404: Page Not Found</h1></div>,
  },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;