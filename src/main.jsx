import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./styles/styles.scss"
import { BrowserRouter } from 'react-router-dom'
import { createContext } from 'react'


export const Context = createContext({ isAuthenticated: false })


const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(false);
  return (
    <Context.Provider value={{ isAuthenticated, setIsAuthenticated, loading, setLoading, user, setUser }}>
      <App />
    </Context.Provider>

  )
}

export const userServer = "https://nodejs-todoapp-tc3r.onrender.com/users/api/v1";
export const taskServer = "https://nodejs-todoapp-tc3r.onrender.com/tasks/api/v1";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>

      <AppWrapper />
    </BrowserRouter>
  </React.StrictMode>,
)
