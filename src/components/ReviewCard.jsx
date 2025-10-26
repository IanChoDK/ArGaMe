import react from 'react';


const ReviewCard = ({ review }) => {

    const reviewDate = new Date(review.created_at).toLocaleDateString();

    return (
        <div className="review-card">
            <div className="review-header">
                    <span className="review-user">{review.user.username}</span>
                    <span className="review-rating">(review.rating)</span>
                    <span className="review-date">{reviewDate}</span>
                    <text className="review-comment">{review.text_review}</text>
            </div>
        </div>
    );
}

export default ReviewCard;