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
import Invoices from "./components/Invoices/Invoice"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        { path: "/tasks", element: <DragAndDropColumns /> },
        { path: "/Dashboard", element: <Dashboard /> },
        { path: "/user-dashboard", element: <UserDashboard /> },
        { path: "/users", element: <Users /> },
        { path: "/messages", element: <Messages /> },
        { path: "/settings", element: <Settings /> },
        { path: "/Auth/Login", element: <Login /> },
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
      index: true,
      element: <Login />
    },
    {
      path: "/register",
      element: <Register />
    }
  ]);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
