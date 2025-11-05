import react from 'react';
import { Link } from 'react-router-dom';

const ReviewCard = ({ review }) => {

    const reviewDate = new Date(review.created_at).toLocaleDateString();

    return (
        <div className="review-card">
            <div className="review-header">
                    <li><strong>Usuario: </strong>
                    <Link to={`/users/${review.user.id}`}>
                    {review.user.username}
                    </Link>
                    </li>
                    <li><strong>Valoracion: </strong> {review.rating}</li>
                    <li><strong>Fecha: </strong> {reviewDate}</li>
                    <text>{review.text_review}</text>
            </div>
        </div>
    );
}

export default ReviewCard;