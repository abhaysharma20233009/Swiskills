import React, { useState } from 'react';

function ReviewCard({ review }) {
  const [rating] = useState(Math.round(review.rating || 0)); // Round to nearest whole star

  // Function to generate filled stars based on the rating
  const generateStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          fill={i <= rating ? 'yellow' : 'gray'}
          viewBox="0 0 24 24"
          width="20"
          height="20"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      );
    }
    return stars;
  };

  // Format the date if available
  const formattedDate = review.createdAt
    ? new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(
        new Date(review.createdAt)
      )
    : 'No date available';

  return (
    <div className="bg-zinc-800 p-4 rounded-lg shadow-lg max-w-sm w-full">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">
            {review.reviewProvider?.username || 'Anonymous User'}
          </h2>
          <p className="text-gray-400">{formattedDate}</p>
          {/* Display skill name */}
          <p className="text-gray-400">
            Skill:{' '}
            {review.skills?.length > 0
              ? review.skills.join(', ')
              : 'Unknown Skill'}
          </p>
        </div>
        <div className="flex space-x-1">{generateStars(rating)}</div>
      </div>
      <p className="mt-2 text-gray-300">
        {review.review || 'No comment provided.'}
      </p>
    </div>
  );
}

export default ReviewCard;
