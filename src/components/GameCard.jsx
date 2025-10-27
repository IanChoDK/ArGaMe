import React from "react"
import { Link } from "react-router-dom";

function GameCard({ game }) {
    return (
        <div class="card h-100 shadow-sm border-0">
            <Link to={`/games/${game.id}`} className="card-link-wrapper">
                <img
                    src={game.thumbnail}
                    className="card-img-top"
                    alt={game.name}
                />
                <div>
                    <h5 className="heading mb-2 text-truncate">{game.name}</h5>

                    <p className="card-text small flex-grow-1">
                    {game.description}
                    </p>

                    <div>
                        {game.is_free ? (
                        <span className="fw-bold text-primary">Gratis</span>
                        ) : (
                        <span className="fw-bold text-primary">${game.price}</span>
                        )}
                    </div>

                    <div className="card-footer small">
                        Lanzamiento: {new Date(game.release_date).toLocaleDateString("es-AR")}
                    </div>
                </div>
            </Link>
                <button class="card-button">Agregar</button>
        </div>
    )
}

export default GameCard


