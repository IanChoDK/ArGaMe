import { useEffect, useState } from "react"
import { fetchUserGames } from "../api/api"
import GameCard from "../components/GameCard"
import { useAuth } from "../context/AuthContext"

function Library() {
    const { user } = useAuth()
    const [games, setGames] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const LoadGames = async () => {
            try {
            const data = await fetchUserGames(user.id)
            setGames(data)
            } catch (error) {
            console.error("Error al cargar la biblioteca:", error)
            } finally {
            setLoading(false)
            }
        }
    
    if (user && user.id){
        LoadGames();
    }
    else{
        setLoading(false);
    }
}, [user])


    if (!user) return <p>Debes iniciar sesion para ver tu biblioteca.</p>

    if (loading) return <p>Cargando biblioteca...</p>

    if (games.length === 0) return <p>No tienes juegos en tu biblioteca.</p>

    return (
        <div>
        <h2>Tu Biblioteca</h2>
            <div className="game-grid">
                {games.map((game) => (
                <GameCard key={game.game_id} game={game.game} />
                ))}
            </div>
        </div>
    )
}

export default Library