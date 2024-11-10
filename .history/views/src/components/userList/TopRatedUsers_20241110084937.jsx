// TopRatedUsers.js
import React, { useState, useEffect } from 'react';
import UserProfileCard from './UserProfileCard';

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

  const fetchUsers = async () => {
    // Fetch top-rated users from the database
    const response = await fetch('/api/users?sortBy=rating&limit=100'); // Adjust endpoint as needed
    const data = [
      {
        "_id": "60c72b2f9b1d8b3a2c7c3c4f",
        "profilePhoto": "url1.jpg",
        "name": "Alice",
        "rating": 4.8,
        "skills": ["JavaScript", "Node.js"],
        "location": "New York"
      },
      {
        "_id": "60c72b2f9b1d8b3a2c7c3c5g",
        "profilePhoto": "url2.jpg",
        "name": "Bob",
        "rating": 4.6,
        "skills": ["Python", "Data Science"],
        "location": "California"
      }
    ]
    ;
    setUsers(data); // Assuming data is an array of user objects
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
