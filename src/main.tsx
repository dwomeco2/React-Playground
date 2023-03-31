import React from 'react'
import { createPortal } from 'react-dom'
import ReactDOM from 'react-dom/client'
import App from './App'
import GithubCorner from './components/GithubCorner/index'

import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/react-playground',
    element: <App />
  }
])

const githubCornerDiv = document.getElementById('github-corner-div') as HTMLElement

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <RouterProvider router={router} />
    {createPortal(<GithubCorner />, githubCornerDiv)}
  </>
)
