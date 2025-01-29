import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MdMessage } from 'react-icons/md';
import { FaUserPlus, FaUserCheck } from 'react-icons/fa';
import SendRequestForm from './SendRequestForm'; // Import the form component

function UserProfile({ initialConnectionStatus }) {
  const { userId } = useParams(); // Get userId from URL
  const [userProfile, setUserProfile] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState(initialConnectionStatus);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to control the modal visibility

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/v1/users/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUserProfile(data.data.data); 
      } catch (error) {
        console.error('Error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserProfile();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const { profile, skills, profilePicture } = userProfile || {};
  const { name, title, location, about, experience, education } = profile || {};

  const handleConnectClick = () => {
    setShowModal(true); // Show the modal when "Connect" is clicked
  };

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans bg-zinc-800">
      <div className="text-center mb-8">
        <img src={profilePicture || 'default-banner.jpg'} alt="Banner" className="w-full h-52 object-cover rounded-lg" />
        <img src={profilePicture || 'default-profile.jpg'} alt="Profile" className="w-32 h-32 rounded-full border-4 border-white shadow-lg -mt-16 mx-auto" />
        <h1 className="text-3xl font-semibold mt-4 text-white">{name}</h1>
        <p className="text-gray-100">{title}</p>
        <p className="text-gray-100">{location}</p>

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
            <button 
              onClick={handleConnectClick} 
              className="bg-blue-500 text-white py-1 px-2 rounded-md flex items-center"
            >
              <FaUserPlus className="mr-2" /> Connect
            </button>
          )}
        </div>
      </div>

      {/* Modal for connection request */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold text-center">Send Connection Request</h2>
            <SendRequestForm 
              onClose={() => setShowModal(false)} // Close the modal after sending the request
              onRequestSuccess={() => setConnectionStatus('connected')} // Update the status to 'connected'
            />
          </div>
        </div>
      )}

      {/* Rest of the profile content */}
      <section className="mb-8">
        <h2 className="text-xl text-zinc-400 font-semibold border-b-2 border-gray-200 pb-1">About</h2>
        <p className="text-gray-100 mt-4">{about || 'No information available'}</p>
      </section>
      {/* Further sections for Experience, Education, Skills */}
    </div>
  );
}

export default UserProfile;
