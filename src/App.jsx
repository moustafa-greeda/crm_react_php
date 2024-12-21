

import {
  createBrowserRouter,
  RouterProvider,
  createHashRouter
} from "react-router-dom";
import Root from './components/Root/Root';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';

import Dashboard from './components/Dashboard/Dashboard';
import DragAndDropColumns from "./pages/Tasks/Tasks";
import Settings from "./components/Settings/Settings";
// import { Dashboard } from "@mui/icons-material";
import Home from "./components/Home";
import Users from "./components/Customer/User";
import UserDashboard from "./components/User/UserDashboard";
import Messages from "./components/Messages/Messages";
import Contracts from "./components/contract/contract";
import Calender from "./components/Calender/Calender";
import Protected from "./components/Auth/Protected";

function App() {
  const router =createBrowserRouter([  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/tasks", element: <DragAndDropColumns /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/user-dashboard", element: <UserDashboard /> },
      { path: "/users", element:<Users />},
      { path: "/messages", element: <Messages /> },
      { path: "/settings", element: <Settings /> },
      { path: '/contract', element: <Contracts /> },
      { path: '/calender', element: <Calender/> },
    ]
  },
{
  path: '/register',
  element: <Register  />,
},
{
  index:true,
  element: <Login/>,
},
])
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
