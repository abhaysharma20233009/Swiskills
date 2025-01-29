import React, { useState } from 'react';
import axios from 'axios';

function SendReview({ onClose, reviewReceiverUsername, userSkills }) {
  const [reviewData, setReviewData] = useState({
    review: '',
    reviewReceiver: reviewReceiverUsername || '',
    skills: '',
    rating: '',
  });
  const [filteredSkills, setFilteredSkills] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Filter skills only when the input field is 'skills'
    if (name === 'skills') {
      const suggestions = userSkills.filter((skill) =>
        skill.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSkills(suggestions); // Update filtered skills
    }

    setReviewData({
      ...reviewData,
      [name]: value,
    });
  };

  const handleSkillSelect = (skill) => {
    setReviewData({
      ...reviewData,
      skills: skill,
    });
    setFilteredSkills([]); // Hide suggestions once a skill is selected
  };

  return (
    <div className="max-w-md mx-auto bg-gray-800 text-white rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Send a Review</h2>
      <form>
        <div className="mb-4 relative">
          <label htmlFor="skills" className="block text-sm font-medium mb-2">
            Skills
          </label>
          <input
            type="text"
            id="skills"
            name="skills"
            value={reviewData.skills}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type a skill"
            required
          />
          {filteredSkills.length > 0 && (
            <ul className="absolute bg-gray-700 text-white w-full mt-1 rounded-md shadow-lg z-10 max-h-40 overflow-y-auto">
              {filteredSkills.map((skill, index) => (
                <li
                  key={index}
                  onClick={() => handleSkillSelect(skill)}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-600"
                >
                  {skill}
                </li>
              ))}
            </ul>
          )}
        </div>
      </form>
    </div>
  );
}

export default SendReview;
