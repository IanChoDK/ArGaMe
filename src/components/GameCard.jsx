import React from "react";

function GameCard({ game }) {
    return (
        <div>
        <img src={game.img} alt={game.title} />
        <h3>{game.title}</h3>
        <p>{game.price === 0 ? "Gratis" : `$${game.price}`}</p>
        <button>Agregar</button>
        </div>
    );
}

export default GameCard;
