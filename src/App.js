// import DragAndDropColumns from "./pages/Tasks/Tasks";
// import Header from "./componentss/Header";
// import Grid from "@mui/material/Grid2";
// import Sidebar from "./componentss/Sidebar";
// import Dashboard from "./componentss/Dashboard";
// import { Routes, Route } from "react-router";
// import Home from "./componentss/Home";
// import Users from "./componentss/User/User";
// import Login from "./componentss/Login/Login";
// import Protected from "./componentss/Login/Prodected";

// function App() {
//   return (
//     <div className="App">


//         <Routes>
//           <Route path="/" element={<Login />} />
//           <Route path="/dashboard" element={<Protected components={Dashboard} />} />
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


import {
  createBrowserRouter,
  RouterProvider,
  createHashRouter
} from "react-router-dom";
import Root from './components/Root/Root';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';

// import Dashboard from './components/Dashboard/Dashboard';
 import Settings from './components/Settings/Settings';
import { Dashboard } from "@mui/icons-material";
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
    
    
    <RouterProvider router={router}>

    </RouterProvider>
   
    </>
  );
}


export default App;



