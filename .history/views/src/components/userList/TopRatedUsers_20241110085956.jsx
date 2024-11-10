// TopRatedUsers.js
import React, { useState, useEffect } from 'react';
import UserProfileCard from './UserProfileCard';
import axios from 'axios';

function TopRatedUsers() {
  const [users, setUsers] = useState([]); // All user data
  const [displayedUsers, setDisplayedUsers] = useState([]); // Users displayed on the current page
  const [page, setPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    // Fetch user data from the database (replace with actual fetch logic)
    fetchUsers();
  }, []);

  useEffect(() => {
    // Update displayed users when page changes
    const startIndex = (page - 1) * usersPerPage;
    const newUsers = users.slice(startIndex, startIndex + usersPerPage);
    setDisplayedUsers(newUsers);
  }, [page, users]);

  const transformUserData = (data) => {
    return data.map(user => {
      return {
        _id: user._id,
        profilePhoto: user.profilePicture || 'default.jpg',  // default photo if none is provided
        name: user.profile.name || user.username,  // use name from profile or username if not available
        rating: user.skills.reduce((acc, skill) => acc + (skill.rating || 0), 0) / (user.skills.length || 1),  // average rating of skills
        skills: user.skills.map(skill => skill.skillName),  // extract skill names
        location: user.profile.location || 'Not specified',  // default location if none is provided
      };
    });
  };
  
  // Example usage:
  const fetchUsers = async () => {
    const response = await axios('/api/v1/users'); // Adjust endpoint as needed
    const rawData = response.data.data.data;
    const transformedData = transformUserData(rawData);
    setUsers(transformedData);
  };
  
  
  

  const handleRequestConnection = (user) => {
    // Logic to handle connection request, e.g., send a request to the backend
    alert(`Connection request sent to ${user.name}`);
  };

  const loadMoreUsers = () => {
    setPage((prevPage) => prevPage + 1);
  };
  

  return (
    <div className="max-w-4xl mx-auto p-6 bg-red-400">
      <h2 className="text-2xl font-semibold text-center mb-6">Top Rated Users</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayedUsers.map((user) => (
          <UserProfileCard
            key={user.id}
            user={user}
            onRequestConnection={handleRequestConnection}
          />
        ))}
      </div>
      {page * usersPerPage < users.length && (
        <button
          onClick={loadMoreUsers}
          className="mt-6 bg-blue-500 text-white py-2 px-4 rounded mx-auto block"
        >
          See More
        </button>
      )}
    </div>
  );
}

export default TopRatedUsers;