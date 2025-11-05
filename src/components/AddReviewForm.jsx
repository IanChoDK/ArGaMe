import { useState } from "react";
import {useAuth} from "../context/AuthContext";
import { postReview } from "../api/api";

function AddReviewForm({ id, onReviewAdded }) {
    const { userProfile } = useAuth();
    const [hover, setHover] = useState(0);
    const [textReview, setTextReview] = useState("");
    const [rating, setRating] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    if (!userProfile) {
        return <div className="alert alert-info">Inicia sesión para dejar una reseña.</div>;
        }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const newReview = {
                rating,
                user_id: userProfile.id,
                text_review: textReview
            };

            await postReview(id, newReview);
            setTextReview("");
            setRating(5);
            if (onReviewAdded) onReviewAdded();
        } catch (err) {
            setError("Error al enviar la reseña. Inténtalo de nuevo.");
        } finally {
            setLoading(false);  

        }
    }

return (
        <div className="card-1 w-50 mb-4">
            <div className="card-body">
                <h5 className="card-title">Deja tu reseña</h5>
                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                    
                    {/* Grupo de Valoración */}
                    <div className="mb-3">
                        <label className="form-label">Valoración</label>
                        <div>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                style={{
                                    cursor: "pointer",
                                    fontSize: "1.5rem",
                                    color: star <= (hover || rating) ? "#ffc107" : "#e4e5e9",
                                }}
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHover(star)}
                                onMouseLeave={() => setHover(0)}
                                >
                            ★
                            </span>
                        ))}
                        </div>
                    </div>

                    {/* Grupo de Comentario */}
                    <div className="mb-3">
                        <label htmlFor="textReview" className="form-label">
                            Comentario
                        </label>
                        <textarea
                            id="textReview"
                            className="form-control" // Clase clave de Bootstrap
                            value={textReview}
                            onChange={(e) => setTextReview(e.target.value)}
                            placeholder="Escribe tu opinión sobre el juego..."
                            rows={4}
                            required
                        />
                    </div>

                    {/* Botón */}
                    <button
                        type="submit"
                        className="btn btn-primary" 
                        disabled={loading}
                    >
                        {loading ? "Enviando..." : "Enviar reseña"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddReviewForm;