import React from "react"
import { Link } from "react-router-dom"

function GameCard({ game }) {
    return (
        <div className="card1 text-center">
        <div className="first-content flex-column">
            <img
            src={game.thumbnail}
            alt={game.name}
            className="img-fluid rounded mb-2"
            style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "10px",
            }}
            />
            <h5 className="fw-bold text-light mt-2">{game.name}</h5>
        </div>

        <div className="second-content flex-column text-center p-2">
            <p
            className="small text-light mb-2"
            style={{
                maxHeight: "70px",
                overflow: "hidden",
                textOverflow: "ellipsis",
            }}
            >
            {game.description || "Sin descripción disponible."}
            </p>

            <div className="mb-2">
            {game.is_free ? (
                <span className="fw-bold text-success">Gratis</span>
            ) : (
                <span className="fw-bold text-primary">${game.price}</span>
            )}
            </div>

            <Link
            to={`/games/${game.id}`}
            className="btn btn-dark btn-sm mt-2"
            style={{ fontSize: "0.9rem" }}
            >
            Ver Detalles
            </Link>
        </div>
        </div>
    )
}

export default GameCard