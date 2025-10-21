import { Routes, Route } from "react-router-dom"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Store from "./pages/Store"
import Profile from "./pages/Profile"
import Library from "./pages/Library"

export default function App() {
  return (
    <>
      <NavBar />
      <div className="container my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> 
          <Route path="/store" element={<Store />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/library" element={<Library />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}
