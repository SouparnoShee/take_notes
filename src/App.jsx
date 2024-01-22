import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Profile from "./pages/Profile"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Home from "./pages/Home"
import toast, { Toaster } from "react-hot-toast"
import { useContext, useEffect } from "react"
import axios from "axios"
import { Context, userServer } from "./main"




function App() {

  const { setUser, setIsAuthenticated, setLoading } = useContext(Context)

  useEffect(() => {
    setLoading(true)
    axios.get(`${userServer}/me`, {
      withCredentials: true,
    }).then((res) => {
      setUser(res.data.user)
      setIsAuthenticated(true)
      setLoading(false);
    }).catch((error) => {
      setUser({})
      setIsAuthenticated(false)
      setLoading(false)
    })
  }, [])


  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
