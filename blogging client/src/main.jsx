import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from './screens/login.jsx'
import Register from './screens/register.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router =  createBrowserRouter([

  {path : '/' , element :  <App/> },
  {path : 'login' , element :  <Login/> },
  {path : 'register' , element :  <Register/> }

])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
    <App />

  </RouterProvider>
  
)
