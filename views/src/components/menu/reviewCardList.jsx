import React from 'react';
import ReviewCard from './reviewCard';

function ReviewsList() {
  const reviews = [
    {
      userName: 'Jane Doe',
      date: 'October 12, 2024',
      rating: 5,
      comment:
        'This skill is amazing! I learned a lot and would definitely recommend it.',
    },
    {
      userName: 'John Smith',
      date: 'October 10, 2024',
      rating: 4,
      comment: 'Great experience, but could use some more examples.',
    },
    {
      userName: 'Alice Johnson',
      date: 'October 8, 2024',
      rating: 3,
      comment:
        'The skill was good, but I think the content could be more detailed.',
    },
  ];

  return (
    <div className="p-6 space-y-4">
      {reviews.map((review, index) => (
        <ReviewCard key={index} review={review} />
      ))}
    </div>
  );
}

export default ReviewsList;
