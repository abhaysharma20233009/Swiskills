import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReviewCard from './ReviewCard';

function ReviewsList() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('/api/v1/reviews/getReviewsFromUser');
        setReviews(response.data.data.data); // Assuming API returns `data` with array of reviews
      } catch (err) {
        console.log('Error:', err.response?.data?.message || err.message);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="p-6 space-y-4">
      {reviews.map((review, index) => (
        <ReviewCard
          key={index}
          review={review}
          userName={
            review.reviewProvider ? review.reviewProvider.username : 'Anonymous'
          }
        />
      ))}
    </div>
  );
}

export default ReviewsList;
