import react from 'react';
import { Link } from 'react-router-dom';

const ReviewCard = ({ review }) => {

    const reviewDate = new Date(review.created_at).toLocaleDateString();

return (
        <div className="list-group-item w-50 mt-4">
            
            {/* Encabezado con Flexbox */}
            <div className="d-flex w-25 justify-content-between">
                <h5 className="mb-1">
                    <Link to={`/users/${review.user.id}`}>
                        {review.user.username}
                    </Link>
                </h5>
                {/* Usamos un "badge" para la valoración, se ve moderno */}
                <span className="badge bg-primary rounded-pill" style={{fontSize: '1rem'}}>
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
        </div>
    );
}

export default ReviewCard;