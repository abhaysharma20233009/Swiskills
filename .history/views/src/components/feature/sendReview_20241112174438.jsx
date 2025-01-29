import React, { useState } from 'react';
import axios from 'axios';
import { showAlert } from '../../api/alert';
function SendReview({ onClose, reviewReceiverUsername, userSkills }) {
  const [reviewData, setReviewData] = useState({
    review: '',
    reviewReceiver: reviewReceiverUsername || '',
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
      console.log(response);
      if (response.data.status === 'success') {
        showAlert('success', 'Review sent successfully');
        setReviewData({
          review: '',
          reviewReceiver: reviewReceiverUsername || '',
          skills: '',
          rating: '',
        });
        onClose(); // Close the modal upon successful submission
      }
    } catch (error) {
      console.error('Error sending review:', error);
      showAlert('error', 'Failed to send review');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-800 text-white rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Send a Review</h2>
      <form onSubmit={handleSubmit}>
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
            Rating (1-5)
          </label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={reviewData.rating}
            onChange={handleChange}
            min="1"
            max="5"
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            rows="4"
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your review here"
            required
          ></textarea>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
          >
            Submit Review
          </button>
        </div>
      </form>
    </div>
  );
}

export default SendReview;
