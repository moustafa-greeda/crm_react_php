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
import Calendar from './components/Calender/Calender';
import Tasks from './pages/Tasks/Tasks';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        { path: 'home', element: <Home /> },
        { path: 'dashboard', element: <ProtectedRoute element={Dashboard} requiredRoles={['admin']} /> },
        { path: 'messages', element: <ProtectedRoute element={Messages} requiredRoles={['admin', 'user']} /> },
        { path: 'users', element: <ProtectedRoute element={Users} requiredRoles={['admin']} /> },
        { path: 'settings', element: <ProtectedRoute element={Settings} requiredRoles={['admin']} /> },
        { path: 'user-dashboard', element: <ProtectedRoute element={UserDashboard} requiredRoles={['user']} /> },
        { path: 'contract', element: <ProtectedRoute element={Contracts} requiredRoles={['admin']} /> },
        { path: 'calender', element: <ProtectedRoute element={Calendar} requiredRoles={['admin', 'user']} /> },
        { path: 'tasks', element: <ProtectedRoute element={Tasks} requiredRoles={['admin']} /> },
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
    {
      path: '/unauthorized',
      element: <div>Unauthorized</div>, // صفحة لعدم السماح
    },
  ]);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;