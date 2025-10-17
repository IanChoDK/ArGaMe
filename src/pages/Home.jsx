import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home() {
    const { user } = useAuth();

    return (
        <header class="home">
            <div class="container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
                <div class="d-flex justify-content-center">
                    <div class="text-center">
                        <h1 class="mx-auto my-0 text-uppercase">Bienvenido a ArGaMe</h1>
                        <h2 class="text-white-50 mx-auto mt-2 mb-5">
                            Plataforma de distribución digital de videojuegos argentinos. 
                            Descubrí, reclamá y reseñá juegos hechos en nuestro país. 🇦🇷
                        </h2>   
                        {user ? ( <Link to="/store" class="btn btn-primary"> Ir a la Tienda </Link> ) : (<Link to="/login" class="btn btn-primary">Iniciar Sesión</Link>)}
                    </div>
                </div>
            </div>
        </header>
        
    );
}


export default Home;

