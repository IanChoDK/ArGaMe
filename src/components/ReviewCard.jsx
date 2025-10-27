import react from 'react';


const ReviewCard = ({ review }) => {

    const reviewDate = new Date(review.created_at).toLocaleDateString();

    return (
        <div className="review-card">
            <div className="review-header">
                    <li><strong>Usuario: </strong>{review.user.username}</li>
                    <li><strong>Valoracion: </strong> {review.rating}</li>
                    <li><strong>Fecha: </strong> {reviewDate}</li>
                    <text>{review.text_review}</text>
            </div>
        </div>
    );
}

export default ReviewCard;