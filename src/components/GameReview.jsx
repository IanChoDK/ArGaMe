import react from "react";
import { useState, useEffect } from "react";
import { fetchReviewForGame } from "../api/api";
import ReviewCard from "./ReviewCard";

function GameReview({ id }) {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {

        const loadReviews = async () => {
            try {
                const gameReviews = await fetchReviewForGame(id);
                setReviews(gameReviews);
                setError(null);
                setLoading(true);
            }
            catch (err) {
                setError(err.message);
            }
            finally {
                setLoading(false);
            }
        };

        loadReviews();

    }, [id]);

    if (loading) {
        return <div>Cargando reseñas...</div>;
    }

    if (error) {
        return <div>Error al cargar reseñas: {error}</div>;
    }

    return (
        <div className="reviews-list">
            {reviews.length === 0 ? (
            <p>Este juego aún no tiene reseñas. ¡Sé el primero!</p>
            ) : (reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
            ))
        )}
        </div>);
}

export default GameReview;