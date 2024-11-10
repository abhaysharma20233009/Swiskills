import React, { useState } from 'react';
import axios from 'axios';

function SendReview() {
  const [reviewData, setReviewData] = useState({
    review: '',
    reviewReceiver: '',
    skills: '',
    rating: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewData({
      ...reviewData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = {
      ...reviewData,
      skills: reviewData.skills.split(',').map((skill) => skill.trim()),
    };
    try {
      const response = await axios.post('/api/v1/reviews', formattedData);
      if (response.data.status === 'success') {
        alert('Review sent successfully!');
        setReviewData({
          review: '',
          reviewReceiver: '',
          skills: '',
          rating: '',
        });
      }
    } catch (error) {
      console.error('Error sending review:', error);
      alert('Failed to send review.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-800 text-white rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Send a Review</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="reviewReceiver"
            className="block text-sm font-medium mb-2"
          >
            Review Receiver USERNAME
          </label>
          <input
            type="text"
            id="reviewReceiver"
            name="reviewReceiver"
            value={reviewData.reviewReceiver}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Receiver username"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="skills" className="block text-sm font-medium mb-2">
            Skills (comma-separated)
          </label>
          <input
            type="text"
            id="skills"
            name="skills"
            value={reviewData.skills}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., JavaScript, React"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="rating" className="block text-sm font-medium mb-2">
            Rating (0.0 - 5.0)
          </label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={reviewData.rating}
            onChange={handleChange}
            step="0.1"
            min="0"
            max="5"
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter rating"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="review" className="block text-sm font-medium mb-2">
            Review
          </label>
          <textarea
            id="review"
            name="review"
            value={reviewData.review}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your review here"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
}

export default SendReview;
