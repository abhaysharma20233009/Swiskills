// ProfileView.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ProfileView() {
  const [bannerImage, setBannerImage] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [profileData, setProfileData] = useState(null);
  const [profile, setProfile] = useState(null);
  const [skills,setSkills] = useState(null);
  const [profilePicture,setProfilePicture]=useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios('/api/v1/users/me');
        console.log(response.data.data.data.profile);
        setProfileData(response.data.data.data);
        setProfile(response.data.data.data.profile);
        
        setProfilePicture(response.data.data.data.profilePicture);
        setSkills(response.data.data.data.skills);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  const handleEdit = () => {
    navigate('/edit-profile', {
      state: {
        profileData,
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans bg-zinc-800">
      {/* Profile display */}
      <div className="text-center mb-8">
        {/* Banner and profile image */}
        <div className="relative border border-gray-400 rounded-md">
          <img className="w-full h-52 object-cover rounded-lg" src={profilePicture} alt="Banner" />
          <div className="relative -mt-16 flex justify-center">
            <img className="w-32 h-32 rounded-full border-4 border-white shadow-lg" src={profilePicture} alt="Profile" />
          </div>
        </div>

        {/* Name, title, and location */}
        <h1 className="text-3xl text-gray-100 font-semibold mt-4">
          {profileData?.profile?.name || 'Your Name'}
        </h1>
        <p className="text-gray-100">username : {profileData?.username || 'Your Title'}</p>
        <p className="text-gray-100">{profileData?.profile?.title || 'Your Title'}</p>
        <p className="text-gray-100">{profileData?.profile?.location || 'Your Location'}</p>
      </div>

      {/* Edit Profile Button */}
      <div className="flex justify-center mt-8">
        <button onClick={handleEdit} className="bg-blue-500 text-white py-2 px-6 rounded-md">
          Edit Profile
        </button>
      </div>

      {/* About Section */}
      <section className="mb-8">
        <h2 className="text-xl text-zinc-400 font-semibold border-b-2 border-gray-200 pb-1">About</h2>
        <p className="text-gray-100 mt-4">{profileData?.profile?.about || 'Write about yourself here.'}</p>
      </section>

      {/* Skills Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold border-b-2 border-gray-200 pb-1 text-zinc-400">Skills</h2>
        {skills?.length > 0 && skills[0].skillName ? (
          <div className="flex flex-wrap space-x-2 mb-4">
            {skills.map((skill, index) => (
              <span key={index} className="bg-zinc-700 text-zinc-100 px-3 py-1 rounded-full text-sm">
                {skill.skillName}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-100 mt-4">Add your skills in the edit profile section.</p>
        )}
      </section>

      {/* Experience Section */}
      <section className="mb-8">
        <h2 className="text-xl text-zinc-400 font-semibold border-b-2 border-gray-200 pb-1">Experience</h2>
        {profileData?.profile?.experience?.length > 0 && profileData?.profile?.experience[0].title ? (
          profileData?.profile?.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <p className="text-lg font-semibold text-gray-100">{exp.title}</p>
              <p className="text-gray-100">{exp.company}</p>
              <p className="text-gray-100">{exp.duration}</p>
              <p className="text-gray-100">{exp.description}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-100 mt-4">Add your work experience in the edit profile section.</p>
        )}
      </section>

      {/* Education Section */}
      <section className="mb-8">
        <h2 className="text-xl text-zinc-400 font-semibold border-b-2 border-gray-200 pb-1">Education</h2>
        {profileData?.profile?.education?.length > 0 && profileData?.profile?.education[0].degree ? (
          profileData?.profile?.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <p className="text-lg font-semibold text-gray-100">{edu.degree}</p>
              <p className="text-gray-100">{edu.university}</p>
              <p className="text-gray-100">{edu.graduation}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-100 mt-4">Add your educational background in the edit profile section.</p>
        )}
      </section>
    </div>
  );
}

export default ProfileView;
