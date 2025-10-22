import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { FaStore, FaBook, FaSignInAlt, FaUserPlus, FaPowerOff } from "react-icons/fa";

function NavBar() {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm fixed-top">
            <div className="container">
                <Link className="navbar-brand d-flex align-items-center fw-bold" to="/">
                <span className="brand-text">ArGaMe</span>
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
                        <FaStore className="me-1"></FaStore> Tienda
                    </Link>
                    </li>

                    {user && (
                    <li className="nav-item">
                        <Link className="nav-link" to="/library">
                            <FaBook className="me-1"></FaBook> Biblioteca
                        </Link>
                    </li>
                    )}
                </ul>

                <ul className="navbar-nav ms-auto">
                    {!user ? (
                    <>
                    <li className="nav-item me-2">
                        <Link className="nav-link" to="/login">
                            <FaSignInAlt className="me-1"></FaSignInAlt> Iniciar sesión
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/register">
                            <FaUserPlus className="me-1"></FaUserPlus> Registrarse
                        </Link>
                    </li>
                    </>
                    ) : (
                    <>
                        <li className="nav-item">
                            <Link className="nav-link d-flex align-items-center" to="/profile">
                            <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2"
                                style={{
                                    width: "20px",
                                    height: "20px",
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                }}>
                                    {user.username ? user.username.charAt(0).toUpperCase() : "?"}
                                </div>
                                {user.username}
                            </Link>
                        </li>
                        <li className="nav-item">
                        <button
                            className="btn btn-outline-light btn-sm ms-2"
                            onClick={logout}
                        >
                            <FaPowerOff className="me-1"></FaPowerOff> Cerrar sesion
                        </button>
                        </li>
                    </>
                    )}
                </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar