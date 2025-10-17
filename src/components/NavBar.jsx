import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function NavBar() {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm fixed-top">
        <div className="container">
            <Link className="navbar-brand d-flex align-items-center fw-bold" to="/">
            <span className="brand-text">🇦🇷 ArGaMe</span>
            </Link>

            <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            >
            <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
                <li className="nav-item">
                <Link className="nav-link" to="/store">
                    <i className="fa-solid fa-store me-1"></i> Tienda
                </Link>
                </li>

                {user && (
                <li className="nav-item">
                    <Link className="nav-link" to="/library">
                    <i className="fa-solid fa-book me-1"></i> Biblioteca
                    </Link>
                </li>
                )}
            </ul>

            <ul className="navbar-nav ms-auto">
                {!user ? (
                <li className="nav-item">
                    <Link className="nav-link" to="/login">
                    <i className="fa-solid fa-right-to-bracket me-1"></i> Iniciar sesión
                    </Link>
                </li>
                ) : (
                <>
                    <li className="nav-item">
                        <Link className="nav-link d-flex align-items-center" to="/profile">
                            <i className="fa-solid me-2 text-primary"></i>
                            {user.name}
                        </Link>
                    </li>
                    <li className="nav-item">
                    <button
                        className="btn btn-outline-light btn-sm ms-2"
                        onClick={logout}
                    >
                        <i className="fa-solid fa-power-off me-1"></i> Cerrar sesion
                    </button>
                    </li>
                </>
                )}
            </ul>
            </div>
        </div>
        </nav>
    );
}

export default NavBar;