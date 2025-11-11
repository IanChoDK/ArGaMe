import React from "react";
import { Link } from "react-router-dom";
import { deleteReview } from "../api/api";
import { useAuth } from "../context/AuthContext";

const ReviewCard = ({ review, onReviewDeleted }) => {
    const { user } = useAuth()
    const reviewDate = new Date(review.created_at).toLocaleDateString()

    const canDelete =
        user &&
        (user.id === review.user.id ||
        user.role === "admin" ||
        user.role === "moderator")

    const handleDelete = async () => {
        if (window.confirm("¿Seguro que deseas eliminar esta reseña?")) {
        try {
            await deleteReview(review.id)
            onReviewDeleted?.()
        } catch (err) {
            console.error("Error al eliminar la reseña:", err)
            alert("No se pudo eliminar la reseña.")
        }
        }
    };

    return (
        <div className="list-group-item w-75 mt-4">

        {/* Encabezado con Flexbox */}
        <div className="d-flex w-25 justify-content-between flex-wrap">
            <h5 className="mb-1">
                <Link to={`/users/${review.user.id}`}>
                    {review.user.username}
                </Link>
            </h5>
            {/* Usamos un "badge" para la valoración, se ve mas moderno */}
            <span
            className="badge bg-primary rounded-pill" style={{ fontSize: "1rem" }}>
                {review.rating} ★
            </span>
        </div>

        {/* El cuerpo de la reseña */}
        <p className="mb-1">
            {review.text_review}
        </p>

        {/* El pie de página de la reseña */}
        <small className="text-muted">
            Publicado el {reviewDate}
        </small>

        {canDelete && (
            <button
            onClick={handleDelete}
            className="btn btn-sm btn-outline-danger position-absolute"
            style={{ top: "10px", right: "10px" }}
            >   
            🗑 Eliminar
            </button>
        )}
        </div>
    );
};

export default ReviewCard;