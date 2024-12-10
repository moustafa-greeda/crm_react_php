// import DragAndDropColumns from "./pages/Tasks/Tasks";
// import Header from "./components/Header";
// import Grid from "@mui/material/Grid2";
// import Sidebar from "./components/Sidebar";
// import Dashboard from "./components/Dashboard";
// import { Routes, Route } from "react-router";
// import Home from "./components/Home";
// import Users from "./components/User/User";
// import Login from "./components/Login/Login";
// import Protected from "./components/Login/Prodected";

// function App() {
//   return (
//     <div className="App">


//         <Routes>
//           <Route path="/" element={<Login />} />
//           <Route path="/dashboard" element={<Protected Component={Dashboard} />} />
//         </Routes>














//       {/* <Routes>
//         <Route path="tasks" element={<DragAndDropColumns />} />
//       </Routes> */}

//       {/* <Header />
//       <Grid container spacing={2} sx={{ flexGrow: 1 }}>
//         <Grid size={2}>
//           <Sidebar />
//         </Grid>
//         <Grid size={10}>
//           <DragAndDropColumns />
//           <Users />
//           <Routes>
//             <Route path="/" element={<Login />}>
//               <Route index element={<Home />} />
//               <Route path="/users" element={<Users />} />
//               <Route index element={<Home />} />
//             </Route>
//             <Route path="/users" element={<Users />} />
//           </Routes>
//         </Grid>
//       </Grid> */}
//     </div>
//   );
// }

// export default App;

import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  createHashRouter
} from "react-router-dom";
import Root from './Component/Root/Root';
import Login from './Component/Auth/Login/Login';
import Register from './Component/Auth/Register/Register';
import Home from './Component/Home/Home'
import Dashboard from './Component/Dashboard/Dashboard';
import Settings from './Component/Settings/Settings';
function App() {
  const router =createHashRouter([{
    path:'/',element:<Root/>,children:[
      {path:"home",element:<Home/>},
      {path:"/dashboard",element:<Dashboard/>},
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
    
    
    <RouterProvider router={router}>

    </RouterProvider>
   
    </>
  );
}


export default App;



