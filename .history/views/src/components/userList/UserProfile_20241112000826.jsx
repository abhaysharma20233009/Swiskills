import React, { useState, useEffect } from 'react';
import { MdMessage } from 'react-icons/md';
import { FaUserPlus, FaUserCheck } from 'react-icons/fa';
import Rating from './Rating';

function UserProfile({ userId, initialConnectionStatus }) {
  const [userProfile, setUserProfile] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState(initialConnectionStatus);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user profile on mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/v1/users/${userId}`);
        console.log(response);
        if (!response.ok) throw new Error('Failed to fetch user profile');
        const data = await response.json();
        setUserProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, [userId]);

  const handleSendRequest = async () => {
    try {
      const response = await fetch(`/api/v1/users/${userId}/connect`, {
        method: 'POST',
      });
      if (response.ok) {
        setConnectionStatus('pending');
      } else {
        throw new Error('Failed to send connection request');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAcceptConnection = async () => {
    try {
      const response = await fetch(`/api/v1/users/${userId}/accept`, {
        method: 'POST',
      });
      if (response.ok) {
        setConnectionStatus('connected');
      } else {
        throw new Error('Failed to accept connection');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans bg-zinc-800">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="relative border border-gray-400 rounded-md">
          <img
            className="w-full h-52 object-cover rounded-lg"
            src={userProfile.bannerImage}
            alt="Banner"
          />
          <div className="relative -mt-16 flex justify-center">
            <img
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              src={userProfile.profileImage}
              alt="Profile"
            />
          </div>
        </div>

        <h1 className="text-3xl font-semibold mt-4 text-white">{userProfile.name}</h1>
        <p className="text-gray-100">{userProfile.title}</p>
        <p className="text-gray-100">{userProfile.location}</p>
        
        {/* Rating */}
        <Rating rating={userProfile.rating} />

        {/* Messaging and Connection Buttons */}
        <div className="flex justify-center space-x-4 mt-4">
          <button className="bg-blue-500 text-white py-1 px-2 rounded-md flex items-center">
            <MdMessage className="mr-2" /> Message
          </button>

          {connectionStatus === 'pending' ? (
            <button className="bg-yellow-500 text-white py-1 px-2 rounded-md flex items-center" onClick={handleAcceptConnection}>
              <FaUserPlus className="mr-2" /> Accept Connection
            </button>
          ) : connectionStatus === 'connected' ? (
            <button className="bg-green-500 text-white py-1 px-2 rounded-md flex items-center">
              <FaUserCheck className="mr-2" /> Connected
            </button>
          ) : (
            <button className="bg-blue-500 text-white py-1 px-2 rounded-md flex items-center" onClick={handleSendRequest}>
              <FaUserPlus className="mr-2" /> Connect
            </button>
          )}
        </div>
      </div>

      {/* About Section */}
      <section className="mb-8">
        <h2 className="text-xl text-zinc-400 font-semibold border-b-2 border-gray-200 pb-1">
          About
        </h2>
        <p className="text-gray-100 mt-4">{userProfile.about}</p>
      </section>

      {/* Experience Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold border-b-2 border-gray-200 pb-1 text-zinc-400">
          Experience
        </h2>
        <h3 className="text-lg text-gray-200 font-semibold">{userProfile.experience.title}</h3>
        <p className="text-gray-200">{userProfile.experience.company}</p>
        <p className="text-gray-200">{userProfile.experience.duration}</p>
        <p className="text-gray-200 mt-2">{userProfile.experience.description}</p>
      </section>

      {/* Education Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold border-b-2 border-gray-200 pb-1 text-zinc-400">
          Education
        </h2>
        <h3 className="text-lg text-gray-200 font-semibold">{userProfile.education.degree}</h3>
        <p className="text-gray-200">{userProfile.education.university}</p>
        <p className="text-gray-200">{userProfile.education.graduation}</p>
      </section>

      {/* Skills Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold border-b-2 border-gray-200 pb-1 text-zinc-400">
          Skills
        </h2>
        <ul className="flex flex-wrap gap-2 mt-2">
          {userProfile.skills.map((skill, index) => (
            <li key={index} className="border border-green-300 shadow-md shadow-red-500 text-white py-1 px-2 rounded">
              <span className="text-white mr-4">{skill.name}</span>
              <Rating rating={skill.rating} maxRating={5} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}



export default UserProfile;

