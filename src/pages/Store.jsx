import { fetchGames } from "../api/api";
import { useEffect, useState } from "react";
import GameCard from "../components/GameCard";

function Store() {
    const [games, setGames] = useState([]);

        useEffect(() => {
        fetchGames().then(setGames);
        }, []);
    
        return (
        <div>
            <h2>Tienda de Juegos</h2>
            <div className="game-grid">
            {games.map((game) => (
                <GameCard key={game.id} game={game} />
            ))}
            </div>
        </div>
        );
}

export default Store;
