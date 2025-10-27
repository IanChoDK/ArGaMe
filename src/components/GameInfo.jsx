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

    if (loading) {
        return <div>Cargando informacion...</div>;
    }

    if (error) {
        return <div>No se puedo encontrar el juego: {error}</div>;
    }

    return (
    <div className="game-info">
        <img src={gameDetails.thumbnail} alt={gameDetails.name} className="game-info-image" />
        <h1>{gameDetails.name}</h1>
        <p className="game-info-description">{gameDetails.description}</p>
        <ul>
            <li><strong>Fecha de Lanzamiento:</strong> {new Date(gameDetails.release_date).toLocaleDateString()}</li>
            <li><strong>Precio:</strong> {gameDetails.is_free ? 'Gratis' : `$${gameDetails.price}`}</li>
            <li><strong>Desarrollador:</strong>{}</li>
            <li><strong>Editor:</strong></li>
        </ul>
    </div>
    );
}

export default GameInfo;