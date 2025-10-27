import React from 'react';
import { useParams } from 'react-router-dom';
import GameInfo from '../components/GameInfo';
import GameReview from '../components/GameReview';

function GameDetail() {
    const { id } = useParams();

    return (
        <div className="game-detail-page">
            <GameInfo id={id} />
            <GameReview id={id} />
        </div>
    );
}

export default GameDetail;