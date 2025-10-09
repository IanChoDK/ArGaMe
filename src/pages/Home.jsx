import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home() {
    const { user } = useAuth();

    return (
        <div className="home">
            <h1>Bienvenido a ArGaMe</h1>
            <p>
                Plataforma de distribución digital de videojuegos argentinos. 
                Descubrí,reclamá y reseñá juegos hechos en nuestro país.
            </p>
            {user ? ( <Link to="/store" className="btn"> Ir a la Tienda </Link> ) : ( <Link to="/login" className="btn">Iniciar Sesión</Link>)}
        </div>
    );
}

export default Home;

