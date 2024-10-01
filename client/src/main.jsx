import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import Layout from './components/layout.jsx'
import Public from './pages/public.jsx'
import DashboardLayout from './components/dashboard/dashboard-layout.jsx'
import Login from './pages/login.jsx'
import Welcome from './pages/welcome.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import NotesList from './pages/notes/notes-list.component.jsx'
import UsersList from './pages/users/users-list.component.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
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
        path: 'dashboard',
        element: <DashboardLayout />,

        children: [
          {
            index: true,
            element: <Welcome />,
          },
          {
            path: 'notes',
            children: [
              {
                index: true,
                element: <NotesList />,
              },
            ],
          },
          {
            path: 'users',
            children: [
              {
                index: true,
                element: <UsersList />,
              },
            ],
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
