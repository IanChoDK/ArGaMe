import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function NavBar() {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar">
            <h2>ArGaMe</h2>
                <div>
                    <Link to="/">Inicio</Link>
                    <Link to="/store">Tienda</Link>
                    <Link to="/library">Biblioteca</Link>
                    {user && <Link to="/profile">Perfil</Link>}
                </div>
            {user ? (<button onClick={logout}>Cerrar sesión</button>) : ( <Link to="/login">Login</Link> )}
        </nav>
    );
}
