import React, { useState, useEffect } from 'react';
import { useParams ,useNavigate} from 'react-router-dom';
import { MdMessage } from 'react-icons/md';
import { FaUserPlus, FaUserCheck } from 'react-icons/fa';
import Rating from './Rating';

function UserProfile({ initialConnectionStatus }) {
  const navigate = useNavigate();
  const handleSend = () => {
    navigate('/chats', {
      state: {
        userProfile,
      },
    });
  };
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
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json(); // Parse the JSON response body
        console.log(data.data.data);  // Now you should be able to see the data
        setUserProfile(data.data.data);  // Assuming the user data is inside `data.data`
      } catch (error) {
        console.error('Error:', error);
        setError(error.message);  // Handle errors appropriately
      } finally {
        setLoading(false);  // Make sure to stop loading after the request completes
      }
    };
    
    fetchUserProfile();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Destructure user profile fields from the response data
  const { profile, requestsReceived, requestsSent, skills, profilePicture } = userProfile || {};
  const { name, title, location, about, experience, education } = profile || {};
    console.log(education);
  return (
    <div className="max-w-4xl mx-auto p-6 font-sans bg-zinc-800">
      {/* Header and Profile Info */}
      <div className="text-center mb-8">
        <img src={profilePicture || 'default-banner.jpg'} alt="Banner" className="w-full h-52 object-cover rounded-lg" />
        <img src={profilePicture || 'default-profile.jpg'} alt="Profile" className="w-32 h-32 rounded-full border-4 border-white shadow-lg -mt-16 mx-auto" />
        <h1 className="text-3xl font-semibold mt-4 text-white">{name}</h1>
        <p className="text-gray-100">{title}</p>
        <p className="text-gray-100">{location}</p>
        
        {/* Messaging and Connection Buttons */}
        <div className="flex justify-center space-x-4 mt-4">
          <button className="bg-blue-500 text-white py-1 px-2 rounded-md flex items-center">
            <MdMessage onClick={handleSend} className="mr-2" /> Message
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
        <p className="text-gray-100 mt-4">{about || 'No information available'}</p>
      </section>

      {/* Experience Section */}
      {experience && experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl text-zinc-400 font-semibold border-b-2 border-gray-200 pb-1">Experience</h2>
          <div className="space-y-4 mt-4">
            {experience.map((exp, index) => (
              <div key={index} className="p-6 bg-zinc-700 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-white">{exp.jobTitle}</h3>
                <p className="text-gray-400">{exp.company}</p>
                <p className="text-gray-200">{exp.startDate} - {exp.endDate || 'Present'}</p>
                <p className="text-gray-100 mt-2">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education Section */}
      {education && education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl text-zinc-400 font-semibold border-b-2 border-gray-200 pb-1">Education</h2>
          <div className="space-y-4 mt-4">
            {education.map((edu, index) => (
              <div key={index} className="p-6 bg-zinc-700 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-white">{edu.degree}</h3>
                <p className="text-gray-400">{edu.fieldOfStudy} - {edu.institution}</p>
                <p className="text-gray-200">{edu.startYear} - {edu.endYear || 'Present'}</p>
                <p className="text-gray-100 mt-2">{edu.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills Section */}
      {skills && skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl text-zinc-400 font-semibold border-b-2 border-gray-200 pb-1">Skills</h2>
          <ul className="list-disc pl-5 mt-4">
            {skills.map((skill, index) => (
              <li key={index} className="text-gray-100">
                <strong>{skill.skillName}</strong> (Rating: {skill.rating}/5, {skill.ratingQuantity} reviews)
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

export default UserProfile;
