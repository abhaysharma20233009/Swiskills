import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MdMessage } from 'react-icons/md';
import { FaUserPlus, FaUserCheck } from 'react-icons/fa';
import Rating from './Rating';

function UserProfile({ initialConnectionStatus }) {
  const { userId } = useParams(); // Get userId from URL
  const [userProfile, setUserProfile] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState(initialConnectionStatus);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/v1/users/${userId}`);
        console.log(response.data);
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const { name, title, location, about, experience, education, skills, profileImage, bannerImage, rating } = userProfile || {};

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans bg-zinc-800">
      {/* Header and Profile Info */}
      <div className="text-center mb-8">
        <img src={bannerImage || 'default-banner.jpg'} alt="Banner" className="w-full h-52 object-cover rounded-lg" />
        <img src={profileImage || 'default-profile.jpg'} alt="Profile" className="w-32 h-32 rounded-full border-4 border-white shadow-lg -mt-16 mx-auto" />
        <h1 className="text-3xl font-semibold mt-4 text-white">{name}</h1>
        <p className="text-gray-100">{title}</p>
        <p className="text-gray-100">{location}</p>
        
        {/* Messaging and Connection Buttons */}
        <div className="flex justify-center space-x-4 mt-4">
          <button className="bg-blue-500 text-white py-1 px-2 rounded-md flex items-center">
            <MdMessage className="mr-2" /> Message
          </button>

          {connectionStatus === 'pending' ? (
            <button className="bg-yellow-500 text-white py-1 px-2 rounded-md flex items-center">
              <FaUserPlus className="mr-2" /> Accept Connection
            </button>
          ) : connectionStatus === 'connected' ? (
            <button className="bg-green-500 text-white py-1 px-2 rounded-md flex items-center">
              <FaUserCheck className="mr-2" /> Connected
            </button>
          ) : (
            <button className="bg-blue-500 text-white py-1 px-2 rounded-md flex items-center">
              <FaUserPlus className="mr-2" /> Connect
            </button>
          )}
        </div>
      </div>
      
      {/* About Section */}
      <section className="mb-8">
        <h2 className="text-xl text-zinc-400 font-semibold border-b-2 border-gray-200 pb-1">About</h2>
        <p className="text-gray-100 mt-4">{about}</p>
      </section>

      {/* Experience, Education, and Skills Sections */}
      {/* Code for displaying experience, education, and skills goes here */}
    </div>
  );
}

export default UserProfile;
