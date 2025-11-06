import react from "react";
import {useState, useEffect} from "react";
import {fetchGame} from "../api/api";

function GameInfo({id}) {
    const [gameDetails, setGameDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const loadGameDetails = async () => {
            try {
                const details = await fetchGame(id);
                setGameDetails(details);
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        
        loadGameDetails();
    }, [id]);

// --- ESTADOS DE CARGA Y ERROR MEJORADOS ---

    if (loading) {
        return (
            // Centramos un spinner de Bootstrap
            <div className="text-center my-5 p-5">
                <div className="spinner-border" style={{ width: '3rem', height: '3rem' }} role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
                <h3 className="mt-3">Cargando información...</h3>
            </div>
        );
    }

    if (error) {
        // Usamos un "alert" de Bootstrap para el error
        return (
            <div className="alert alert-danger my-4">
                <h4>Error</h4>
                <p>No se pudo encontrar el juego: {error}</p>
            </div>
        );
    }


    return (
        <div className="container my-4">
            
            {/* --- BLOQUE DE INFORMACIÓN PRINCIPAL --- */}
            <div className="rounded shadow-sm" style={{ overflow: 'hidden' }}>
                <div className="row g-0">
                    
                    {/* --- COLUMNA IZQUIERDA (Imagen) --- */}
                    <div className="col-12 col-md-5">
                        <img 
                            src={gameDetails.thumbnail} 
                            alt={gameDetails.name} 
                            className="w-100 h-100 rounded shine-border" 
                            style={{ objectFit: 'cover' }}
                        />
                    </div>

                    {/* --- COLUMNA DERECHA (Información) --- */}
                    <div className="col-12 col-md-7 p-4">
                        
                        <h1 className="display-4 fw-bold">{gameDetails.name}</h1>
                        <p className="lead my-3">{gameDetails.description}</p>

                        <ul className="list-group list-group-flush rounded mt-4">
                            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap gap-2">
                                <div className="d-flex align-items-center gap-2">
                                    <strong>Precio:</strong>
                                    <span className="badge bg-info rounded-pill fs-6">
                                        {gameDetails.is_free ? 'Gratis' : `$${gameDetails.price}`}
                                    </span>
                                </div>
                                <button className="btn btn-sm btn-primary">
                                    Agregar a la biblioteca
                                </button>
                            </li>

                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <strong>Fecha de Lanzamiento:</strong>
                                <span>{new Date(gameDetails.release_date).toLocaleDateString()}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <strong>Desarrollador:</strong>
                                <span>{gameDetails.developer.name}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <strong>Editor:</strong>
                                <span>{gameDetails.editor.name}</span>
                            </li>
                        </ul>
                        
                    </div> {/* Fin Columna Derecha con Padding */}
                </div> {/* Fin Row (g-0) */}
            </div> {/* Fin Wrapper (rounded) */}


            <div className="mt-4 rounded shadow-sm p-4"> 
                <h3 className="mb-3">Requisitos del Sistema</h3>
                
                {/* Fila para Mínimos y Recomendados */}
                <div className="row">

                    {/* Columna Mínimos */}
                    <div className="col-12 col-md-6">
                        <h5 className="fw-bold">Mínimos</h5>
                        <ul className="list-group list-group-flush text-muted rounded mt-4">
                            <li className="list-group-item"><strong>SO:</strong> Windows 7/ 8/ 10 (64 bits)</li>
                            <li className="list-group-item"><strong>Procesador:</strong> Intel Core 2 Duo 2.0 GHz or AMD Athlon X2 2.2 GHz</li>
                            <li className="list-group-item"><strong>Memoria:</strong> 2 GB Ram</li>
                            <li className="list-group-item"><strong>Gráficos:</strong> nVidia 240, ATI 4650, Intel Integrated HD 4000</li>
                            <li className="list-group-item"><strong>Almacenamiento: 15 GB</strong> </li>
                        </ul>
                    </div>

                    {/* Columna Recomendados */}
                    <div className="col-12 col-md-6">
                        <h5 className="fw-bold">Recomendados</h5>
                        <ul className="list-group list-group-flush text-muted rounded mt-4">
                            <li className="list-group-item"><strong>SO:</strong> Windows 7/ 8/ 10 (64 bits)</li>
                            <li className="list-group-item"><strong>Procesador:</strong> Intel i5 2.8 GHz or AMD Athlon x4 3.0 GHz</li>
                            <li className="list-group-item"><strong>Memoria:</strong> 4 GB Ram</li>
                            <li className="list-group-item"><strong>Gráficos:</strong> Nvidia 560, ATI 5870</li>
                            <li className="list-group-item"><strong>Almacenamiento:</strong> 15 GB</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="mt-4 rounded shadow-sm p-4">
                <h3 className="mb-3">Más de {gameDetails.developer.name}</h3>
                
                <div className="row">
                    
                    {/* Juego Recomendado 1 */}
                    <div className="rounded col-12 col-md-6 bg-dark col-lg-4 mb-3">
                        <div className="card-1 h-100">
                            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/222520/header.jpg?t=1612867232" className="card-img-top" alt="Juego 1"/>
                            <div className="card-body text-center">
                                <h6 className="card-title">Otro Juego del Dev</h6>
                                <p className="btn btn-primary">Gratis</p>
                            </div>
                        </div>
                    </div>

                    {/* Juego Recomendado 2 */}
                    <div className="rounded col-12 col-md-6 col-lg-4 mb-3">
                        <div className="card-1 h-100">
                            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/882150/header.jpg?t=1631197856" className="card-img-top" alt="Juego 2"/>
                            <div className="card-body text-center p-2">
                                <h6 className="card-title">Proximo Lanzamiento</h6>
                                <p className="btn btn-primary">Acceso anticipado</p>
                            </div>
                        </div>
                    </div>

                    {/* Juego Recomendado 3 */}
                    <div className="rounded col-12 col-md-6 bg-dark col-lg-4 mb-3">
                        <div className="card-1 h-100">
                            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1622900/header.jpg?t=1697483511" className="card-img-top" alt="Juego 3"/>
                            <div className="card-body text-center">
                                <h6 className="card-title">Mismo Genero</h6>
                                <p className="btn btn-primary">$20 (proximamente) </p>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div> /* Fin Container */

    );
}

export default GameInfo;