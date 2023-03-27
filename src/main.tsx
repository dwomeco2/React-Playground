import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Layout from './routes/layout'

import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/react-playground-dist",
    element: <App />,
  },
  {
    path: "/react-playground-dist/layout",
    element: <Layout />
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <RouterProvider router={router} />
  </>,
)
