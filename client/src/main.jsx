import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import Public from './pages/public.jsx'
import DashboardLayout from './components/dashboard/dashboard-layout.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Login from './pages/login.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Public />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: '/dashboard',
        children: [
          {
            index: true,
            element: <DashboardLayout />,
          },
        ],
      },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
