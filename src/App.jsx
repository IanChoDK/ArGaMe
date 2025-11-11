import { Routes, Route } from "react-router-dom"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Store from "./pages/Store"
import Profile from "./pages/Profile"
import Library from "./pages/Library"
import CrudGames from "./pages/UploadGame"
import GameDetail from "./pages/GameDetail"
import UserProfile from "./pages/UserProfile"

export default function App() {
  return (
    <>
      <div className="app-container">
        <NavBar />
          <div className="content-wrap">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} /> 
              <Route path="/store" element={<Store />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/users/:id" element={<UserProfile />} />
              <Route path="/library" element={<Library />} />
              <Route 
                path="/uploadgame"
                element={
                    <CrudGames />
                }
              />
              <Route path="/games/:id" element={<GameDetail />} />
            </Routes>
          </div>
        <Footer />
      </div>
    </>
  )
}
