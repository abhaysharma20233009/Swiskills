import React from 'react';
import { useNavigate } from 'react-router-dom';

function UserProfileCard({ user, onRequestConnection }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    // Navigate to the user's page by username
    navigate(`/top-rated-users/${user.username}`);
  };

  return (
    <div
      onClick={handleCardClick} // Make the card clickable
      className="border rounded-lg p-4 bg-white shadow-lg flex flex-col items-center text-center cursor-pointer"
    >
      <img src={user.profilePhoto} alt={user.name} className="w-24 h-24 rounded-full mb-2" />
      <h3 className="text-lg font-semibold">{user.name}</h3>
      <p className="text-yellow-500 font-semibold">⭐ {user.rating}</p>
      <p className="text-gray-600">{user.location}</p>
      <div className="flex flex-wrap justify-center gap-2 mt-2">
        {user.skills.map((skill, index) => (
          <span key={index} className="bg-blue-500 text-white py-1 px-2 rounded">
            {skill}
          </span>
        ))}
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent triggering card click
          onRequestConnection(user); // Call the connection request handler
        }}
        className="mt-3 bg-blue-500 text-white py-1 px-3 rounded"
      >
        Request Connection
      </button>
    </div>
  );
}

export default UserProfileCard;
