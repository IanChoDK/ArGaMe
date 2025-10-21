import { useEffect, useState } from "react"
import { fetchGames } from "../api/api"
import GameCard from "../components/GameCard"

function Store() {
    const [games, setGames] = useState([])
    useEffect(() => {
        fetchGames().then(setGames).catch(err => console.error(err))
    }, []);

    return (
        <div className="container my-6">
        <h2 className="text-center mb-4 text-light">
            Catalogo de juegos
        </h2>

        <div className="row justify-content-center g-5">
            {games.map((game) => (
            <div key={game.id} className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center">
                <GameCard game={game} />
            </div>
            ))}
        </div>
        </div>
    )
}

export default Store
