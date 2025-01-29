import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MdMessage } from 'react-icons/md';
import { FaUserPlus, FaUserCheck } from 'react-icons/fa';
import axios from 'axios';
import SendRequestForm from '../feature/sendRequests';

function UserProfile({ initialConnectionStatus }) {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState(initialConnectionStatus);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [sentRequests, setSentRequests] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/v1/users/${userId}`);
        if (!response.ok) throw new Error('Failed to fetch user data');
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

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get('/api/v1/requests/sent', { withCredentials: true });
        if (res.data.status === 'success') {
          setSentRequests(res.data.data.sentRequests || []);
        } else {
          console.warn('Unexpected response format:', res.data);
        }
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchRequests();
  }, []);

  useEffect(() => {
    if (sentRequests.length > 0) {
      const userRequest = sentRequests.find((request) => request.receiver._id === userId);
      if (userRequest) {
        setConnectionStatus(userRequest.status);
      } else {
        setConnectionStatus(null); // User has not sent a request
      }
    }
  }, [sentRequests, userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleSend = () => {
    navigate('/chats', { state: { userProfile } });
  };

  const handleConnectClick = () => {
    setShowModal(true);
  };

  const statusClasses = {
    pending: 'text-yellow-700 bg-yellow-100',
    accepted: 'text-green-700 bg-green-100',
    rejected: 'text-red-700 bg-red-100',
  };

  const { profile, profilePicture } = userProfile || {};
  const { name, title, location, about, experience, education, skills } = profile || {};

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans bg-zinc-800">
      <div className="text-center mb-8">
        <img src={profilePicture || 'default-banner.jpg'} alt="Banner" className="w-full h-52 object-cover rounded-lg" />
        <img src={profilePicture || 'default-profile.jpg'} alt="Profile" className="w-32 h-32 rounded-full border-4 border-white shadow-lg -mt-16 mx-auto" />
        <h1 className="text-3xl font-semibold mt-4 text-white">{name}</h1>
        <p className="text-gray-100">{title}</p>
        <p className="text-gray-100">{location}</p>

        <div className="flex justify-center space-x-4 mt-4">
          <button onClick={handleSend} className="bg-blue-500 text-white py-1 px-2 rounded-md flex items-center">
            <MdMessage className="mr-2" /> Message
          </button>

          <div className="flex items-center space-x-2">
            {connectionStatus ? (
              <span
                className={`px-3 py-1 rounded-md text-sm font-semibold ${statusClasses[connectionStatus.toLowerCase()]}`}
              >
                {connectionStatus.charAt(0).toUpperCase() + connectionStatus.slice(1)}
              </span>
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
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold text-center">Send Connection Request</h2>
            <SendRequestForm
              onClose={() => setShowModal(false)}
              onRequestSuccess={() => setConnectionStatus('pending')}
            />
          </div>
        </div>
      )}

      {/* Profile details (About, Experience, Education, Skills) */}
      {/* The rest of your component here remains unchanged */}
    </div>
  );
}

export default UserProfile;
