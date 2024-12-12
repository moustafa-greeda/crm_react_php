import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./components/Root/Root";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";

import Dashboard from './components/Dashboard/Dashboard';
 import Settings from './components/Settings/Settings';
// import { Dashboard } from "@mui/icons-material";
import Home from "./components/Home";
function App() {
  const router =createHashRouter([{
    path:'/',element:<Root/>,children:[
      {path:"home",element:<Home/>},
      // {path:"/dashboard",element:<Dashboard/>},
      {path:"/settings",element:<Settings/>}
    ]    
},
{
  path: '/login',
  element: <Login />,
},
{
  index:true,
  element: <Register />,
},
])
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
