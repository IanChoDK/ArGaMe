import React, { useEffect, useState } from "react"
import { fetchGames } from "../api/api"
import { useNavigate } from "react-router-dom"

function FeaturedGame() {
    const [featuredGame, setFeaturedGame] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        async function loadFeaturedGame() {
        try {
            const games = await fetchGames()
            if (games && games.length > 0) {
            const randomIndex = Math.floor(Math.random() * games.length)
            setFeaturedGame(games[randomIndex])
            }
        } catch (error) {
            console.error("Error al cargar juego destacado:", error)
        } finally {
            setLoading(false)
        }
        }

        loadFeaturedGame()
    }, [])

    if (loading) {
        return (
        <div className="d-flex justify-content-center align-items-center py-5">
            <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Cargando...</span>
            </div>
        </div>
        );
    }

    if (!featuredGame) {
        return (
        <div className="text-center text-light py-5">
            <h5>No se encontró ningún juego destacado</h5>
        </div>
        )
    }

    return (
        <section className="bg-dark text-light py-5 mt-4">
            <div className="container">

                <h2 className="fw-bold text-center mb-5 text-uppercase text-primary">
                Juego destacado
                </h2>

                <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-4">

                <div className="flex-shrink-0">
                    <img
                    src={featuredGame.thumbnail}
                    alt={featuredGame.name}
                    className="img-fluid rounded shadow"
                    />
                </div>

                <div className="text-center text-md-start">
                    <h3 className="fw-bold mb-3">{featuredGame.name}</h3>
                    <p className="text-secondary mb-4">
                    {featuredGame.description
                        ? featuredGame.description.substring(0, 160) + "..."
                        : "Descubre este increíble juego destacado del día."}
                    </p>
                    <button
                    className="btn btn-primary btn-lg"
                    onClick={() => navigate(`/games/${featuredGame.id}`)}
                    >
                    Ver detalles
                    </button>
                </div>
                </div>
            </div>
        </section>
    )
}

export default FeaturedGame

