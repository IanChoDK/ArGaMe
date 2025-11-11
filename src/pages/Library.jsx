import { useEffect, useState } from "react"
import { fetchUserGames } from "../api/api"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

function Library() {
    const { user } = useAuth()
    const [games, setGames] = useState([])
    const [loading, setLoading] = useState(true)
    const [downloadingId, setDownloadingId] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const loadGames = async () => {
        try {
            const data = await fetchUserGames(user.id)
            setGames(data)
        } catch (error) {
            console.error("Error al cargar la biblioteca:", error)
        } finally {
            setLoading(false)
        }
        }

        if (user && user.id) {
        loadGames()
        } else {
        setLoading(false)
        }
    }, [user])

    const handleDownload = (gameId) => {
        setDownloadingId(gameId)
        setTimeout(() => {
        setDownloadingId(null)
        alert("Descarga completada ✅")
        }, 2000)
    }

    const handleVisitStore = (gameId) => {
        navigate(`/games/${gameId}`)
    }

    if (!user)
        return (
        <div className="d-flex justify-content-center align-items-center vh-100 text-light">
            <div className="text-center">
            <h2 className="text-warning fw-bold">No has iniciado sesión</h2>
            <p className="text-secondary">
                Iniciá sesión para ver tu biblioteca de juegos.
            </p>
            </div>
        </div>
        )

    if (loading)
        return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="text-center">
            <div
                className="spinner-border text-primary"
                style={{ width: "3rem", height: "3rem" }}
                role="status"
            >
                <span className="visually-hidden">Cargando...</span>
            </div>
            <h4 className="mt-3 text-light">Cargando tu biblioteca...</h4>
            </div>
        </div>
        )

    if (games.length === 0)
        return (
        <div className="d-flex justify-content-center align-items-center vh-100 text-light">
            <div className="text-center">
            <h2 className="fw-bold text-primary">Tu biblioteca está vacía</h2>
            <p className="text-secondary">
                Reclamá juegos desde la tienda para verlos aquí.
            </p>
            </div>
        </div>
        )

    return (
        <div className="container py-5">
        <h2 className="text-center text-primary fw-bold mb-4">Tus juegos</h2>

        <div className="row g-4">
            {games.map((game) => (
            <div key={game.game_id} className="col-12 col-sm-6 col-md-4">
                <div className="card-1 bg-dark text-light shadow-sm border-0 h-100">
                <img
                    src={game.game.thumbnail}
                    alt={game.game.name}
                    className="card-img-top rounded-top"
                    style={{ objectFit: "cover", height: "180px" }}
                />
                <div className="card-body d-flex flex-column text-center">
                    <h5 className="card-title fw-bold mb-3">{game.game.name}</h5>

                    <div className="mt-auto">
                    <button
                        className="btn btn-primary w-100 mb-2 fw-semibold"
                        onClick={() => handleDownload(game.game_id)}
                        disabled={downloadingId === game.game_id}
                    >
                        {downloadingId === game.game_id ? (
                        <>
                            <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                            ></span>
                            Descargando...
                        </>
                        ) : (
                        "Descargar"
                        )}
                    </button>

                    <button
                        className="btn btn-outline-info btn-sm w-100"
                        onClick={() => handleVisitStore(game.game_id)}
                    >
                        Visitar página de tienda
                    </button>
                    </div>
                </div>
                </div>
            </div>
            ))}
        </div>
        </div>
    )
}

export default Library