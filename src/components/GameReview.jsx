import React, { useState, useEffect } from "react";
import { fetchReviewForGame } from "../api/api";
import ReviewCard from "./ReviewCard";
import AddReviewForm from "./AddReviewForm";

function GameReview({ id }) {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadReviews = async () => {
        setLoading(true);
        try {
            const gameReviews = await fetchReviewForGame(id);
            setReviews(gameReviews);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadReviews();
    }, [id]);

if (loading) {
        return (
            <div className="text-center my-5">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
                <p>Cargando reseñas...</p>
            </div>
        );
    }
    
    if (error) {
        return <div className="alert alert-danger">Error al cargar reseñas: {error}</div>;
    }

    return (
        <div className="container my-5">
            <AddReviewForm gameId={id} onReviewAdded={loadReviews} />

            <h3 className="mt-4 mb-3">Reseñas de Usuarios</h3>
            {reviews.length === 0 ? (
                <p className="text-muted fst-italic">Este juego aún no tiene reseñas. ¡Sé el primero!</p>
            ) : (
                // Usamos list-group para apilar las ReviewCards
                <div className="list-group">
                    {reviews.map((review) => (
                        <ReviewCard key={review.id} review={review} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default GameReview;