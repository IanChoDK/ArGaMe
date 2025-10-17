import React from "react";

function GameCard({ game }) {
    return (
        <div class="card">
        <div>
            <p class="heading">Popular this month</p>
            <p>Powered By</p>
            <p>Uiverse</p>
        </div>

        <button class="card-button">More Info</button>
        </div>
    );
}

export default GameCard;