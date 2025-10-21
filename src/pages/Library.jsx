import { useEffect, useState } from "react"
import { fetchGames } from "../api/api"
import GameCard from "../components/GameCard"
import { useAuth } from "../context/AuthContext"

function Library() {
    const { user } = useAuth()
    const [games, setGames] = useState([])

    useEffect(() => {
        fetchGames().then((data) => setGames(data))
    }, [])

    if (!user) return <p>Debes iniciar sesion para ver tu biblioteca.</p>

    return (
        <div>
        <h2>Tu Biblioteca</h2>
            <div className="game-grid">
                {games.map((game) => (
                <GameCard key={game.id} game={game} />
                ))}
            </div>
        </div>
    )
}

export default Library