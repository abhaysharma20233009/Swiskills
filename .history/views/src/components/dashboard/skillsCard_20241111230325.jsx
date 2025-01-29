import React from 'react';
import { useNavigate } from 'react-router-dom';
const ExploreCard = ({ name, image, enrolledUsers }) => {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/${name}/top-rated-user`, {
      state: {
        name,
      },
    });
  };
 
  return (
   
    <div className="max-w-xs rounded-lg bg-zinc-800 shadow-md p-4 text-white">
      
      {/* Image Section */}
      <div className="w-full h-48 mb-4 overflow-hidden rounded-lg">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Name Section */}
      <h3 className="text-xl font-semibold mb-2">{name}</h3>

      {/* Enrolled Users */}
      <p className="text-sm mb-4">
        <span className="font-semibold">Current Enrolled Users:</span>{' '}
        {enrolledUsers}
      </p>

      {/* Explore Button */}
      <div className="flex justify-end">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg" onClick={handleEdit}>
          Explore
        </button>
      </div>
    </div>
    
  );
};

export default ExploreCard;
