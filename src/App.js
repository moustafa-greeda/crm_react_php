import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './components/Root/Root';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import Messages from './components/Messages/Messages';
import Dashboard from './components/Dashboard/Dashboard';
import Settings from './components/Settings/Settings';
import Users from './components/Customer/User';
import UserDashboard from './components/User/UserDashboard';
import Home from './components/Home';
import Contracts from './components/contract/contract';
import ProtectedRoute from './components/Auth/ProtectedRoute';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        { path: 'home', element: <Home /> },
        { path: '/dashboard', element: <ProtectedRoute element={Dashboard} /> },
        { path: '/messages', element: <ProtectedRoute element={Messages} /> },
        { path: '/users', element: <ProtectedRoute element={Users} /> },
        { path: '/settings', element: <ProtectedRoute element={Settings} /> },
        { path: '/user-dashboard', element: <ProtectedRoute element={UserDashboard} /> },
        { path: '/contract', element: <ProtectedRoute element={Contracts} /> },
      ],
    },
    {
      index: true,
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;