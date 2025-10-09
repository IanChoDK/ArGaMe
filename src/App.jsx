import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Library from "./pages/Library";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Store from "./pages/Store";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/library" element={<Library />} />
            <Route path="/store" element={<Store />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}
