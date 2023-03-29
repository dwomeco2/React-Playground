import React from 'react'
import { createPortal } from 'react-dom'
import ReactDOM from 'react-dom/client'
import App from './App'
import Layout from './routes/layout'
import GithubCorner from './component/GithubCorner/index'

import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/react-playground',
    element: <App />
  },
  {
    path: '/react-playground/layout',
    element: <Layout />
  }
])

const githubCornerDiv = document.getElementById('github-corner-div') as HTMLElement

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <RouterProvider router={router} />
    {createPortal(<GithubCorner />, githubCornerDiv)}
  </>
)
