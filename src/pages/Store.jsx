import { useEffect, useState } from "react"
import { fetchGames } from "../api/api"
import GameCard from "../components/GameCard"
import { Link } from "react-router-dom"

function Store() {
    const [games, setGames] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        fetchGames()
            .then((data) => setGames(data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false))
    }, [])

    const getRandomGame = () => {
        if (games.length === 0) return null
        const randomIndex = Math.floor(Math.random() * games.length)
        return games[randomIndex]
    }

    const randomGame = getRandomGame()

    if (loading) {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-light">
                <div className="spinner-border text-light mb-3" role="status"></div>
                <p className="fs-5">Cargando juegos...</p>
            </div>
        )
    }

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4 text-light fw-bold">
                Tienda
            </h2>

            <div className="mb-4 d-flex justify-content-center">
                <input
                    type="text"
                    className="form-control w-50"
                    placeholder="🔍 Buscar juegos..."
                />
            </div>

            <div className="d-flex justify-content-center gap-3 mb-5 flex-wrap">
                {["Mundo abierto", "Roguelike", "Terror", "Acción"].map((genre, index) => (
                    <button key={index} className="btn btn-outline-light btn-sm">
                        {genre}
                    </button>
                ))}
            </div>

            <div className="row justify-content-center g-4">
                {games.map((game) => (
                    <div
                        key={game.id}
                        className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center"
                    >
                        <GameCard game={game} />
                    </div>
                ))}
            </div>

            <div className="mt-5 text-center">
                <h3 className="text-light mb-4">🎲 Juego Random 🎲</h3>
                <div className="d-flex justify-content-center">
                    {randomGame ? (
                        <Link to={`/games/${randomGame.id}`} className="text-decoration-none">
                            <GameCard
                                game={{
                                    id: randomGame.id,
                                    name: "???",
                                    description: "Descubrí un juego misterioso",
                                    thumbnail: "https://via.placeholder.com/190x254?text=%3F%3F%3F",
                                    is_free: true,
                                    price: "?",
                                    release_date: new Date(),
                                }}
                            />
                        </Link>
                    ) : (
                        <p className="text-light">Cargando juego random...</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Store