import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCamera } from 'react-icons/fa';
import axios from 'axios';
import SkillModal from './SkillModal'; // Ensure this import matches your file structure
import { showAlert } from '../../api/alert';

function ProfileEdit() {
  const location = useLocation();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [showSkillModal, setShowSkillModal] = useState(false); // State to manage SkillModal visibility
  const [profileData, setProfileData] = useState({
    profile: {
      name: location.state?.profileData?.profile?.name || '',
      title: location.state?.profileData?.profile?.title || '',
      location: location.state?.profileData?.profile?.location || '',
      about: location.state?.profileData?.profile?.about || '',
      experience: location.state?.profileData?.profile?.experience || [], // Initialize experience
      education: location.state?.profileData?.profile?.education || [],   // Initialize education
    },
    skills: Array.isArray(location.state?.profileData?.skills)
      ? location.state.profileData.skills
      : [{ skillName: '' }],
      
  });
  const [localExperience, setLocalExperience] = useState(profileData.profile.experience);
  const [localEducation, setLocalEducation] = useState(profileData.profile.education);
  const [bannerImage, setBannerImage] = useState(location.state?.profileData?.profilePicture || '');
  const [profileImage, setProfileImage] = useState(location.state?.profileData?.profilePicture || '');

  // Toggle skill modal visibility
  const toggleSkillModal = () => {
    setShowSkillModal(!showSkillModal);
  };

  const handleAddSkill = (skill) => {
    setProfileData((prevData) => ({
      ...prevData,
      skills: [...prevData.skills, { skillName: skill }],
    }));
  };

  // Handle file change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file) {
      showAlert('error',"Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append('profileImage', file);
    try {
      const res = await axios({
        method: 'POST',
        url: '/api/v1/users/upload-profile-photo', // Your upload URL
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data', // Necessary for file upload
        },
        withCredentials: true, // If your backend needs cookies or sessions
      });
      showAlert('success',"Profile picture uploaded successfully!");
    } catch (err) {
      console.log('Error:', err.response?.data?.message || err.message);
      alert("Error uploading profile picture.");
    }
  };

  const handleSave = async () => {

   
    setProfileData((prevData) => ({
      ...prevData,
      profile: { ...prevData.profile, experience: localExperience },
    }));
    console.log(profileData.profile);
    const data = {
      profile: {
        name: profileData.profile.name,
        about: profileData.profile.about,
        location: profileData.profile.location,
        title: profileData.profile.title,
        experience: profileData.profile.experience,
        education: profileData.profile.education,
      },
      skills: profileData.skills,
    };
    try {
      const response = await fetch('/api/v1/users/updateMe', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        navigate('/profile');
      } else {
        console.error('Failed to save profile');
      }
    } catch (error) {
      console.log('Error:', error.message);
    }
  };

  // Add new experience
  const handleExperienceChange = (index, field, value) => {
    setLocalExperience((prevExperience) => {
      const updatedExperience = [...prevExperience];
      updatedExperience[index] = { ...updatedExperience[index], [field]: value };
      return updatedExperience;
    });
  };

  const handleAddExperience = () => {
    setLocalExperience((prevExperience) => [
      ...prevExperience,
      { title: '', company: '', duration: '', description: '' }
    ]);
   
  };
  

  // Add new education
  const handleEducationChange = (index, field, value) => {
    setLocalEducation((prevEducation) => {
      const updatedEducation = [...prevEducation];
      updatedEducation[index] = { ...updatedEducation[index], [field]: value };
      return updatedEducation;
    });
  };

  const handleAddEducation = () => {
    setLocalEducation((prevEducation) => [
      ...prevEducation,
      { degree: '', university: '', graduation: '' } // New empty education object
    ]);
    setProfileData((prevData) => ({
      ...prevData,
      profile: { ...prevData.profile, education: localEducation },
    }));
  };
  

  console.log(profileData);

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans bg-zinc-800">
      <h2 className="text-2xl text-center text-zinc-400 mb-6">Edit Profile</h2>

      {/* Profile display */}
      <section className="mb-8">
        <div className="text-center mt-4">
          {/* Banner and profile image */}
          <div className="relative ">
            {/* Banner Image Preview */}
            <img
              className="w-full h-52 object-cover border border-gray-400 rounded-md"
              src={bannerImage || '/default-banner.jpg'} // Placeholder if no banner image
              alt="Banner"
            />
            {/* Profile Image Preview */}
            <div className="relative -mt-16 flex justify-center">
              <img
                className="w-32 h-32 rounded-full border-4 border-green-400 shadow-lg"
                src={profileImage || '/default-profile.jpg'} // Placeholder if no profile image
                alt="Profile"
              />
              {/* Profile Image Upload Icon */}
              <label className="absolute cursor-pointer">
                <input
                  type="file" accept="image/*" onChange={handleFileChange}
                  className='hidden' />
                <FaCamera className="text-3xl text-white bg-slate-400 hover:bg-slate-500 p-2 rounded-full shadow-lg h-8 w-8 mr-20" />
              </label>
              <button onClick={handleUpload} className='p-1 border border-green-500 bg-blue-600 rounded-md w-auto h-8 mt-24 text-white'>Upload Profile Photo</button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="mb-8">
        <h3 className="text-xl text-zinc-400 font-semibold border-b-2 border-gray-200 pb-1">About</h3>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Name"
            value={profileData.profile.name}
            onChange={(e) => setProfileData({ ...profileData, profile: { ...profileData.profile, name: e.target.value } })}
            className="bg-zinc-700 text-zinc-100 px-3 py-1 mt-2 rounded-md w-full"
          />
          <input
            type="text"
            placeholder="Title"
            value={profileData.profile.title}
            onChange={(e) => setProfileData({ ...profileData, profile: { ...profileData.profile, title: e.target.value } })}
            className="bg-zinc-700 text-zinc-100 px-3 py-1 mt-2 rounded-md w-full"
          />
          <input
            type="text"
            placeholder="Location"
            value={profileData.profile.location}
            onChange={(e) => setProfileData({ ...profileData, profile: { ...profileData.profile, location: e.target.value } })}
            className="bg-zinc-700 text-zinc-100 px-3 py-1 mt-2 rounded-md w-full"
          />
          <textarea
            placeholder="About"
            value={profileData.profile.about}
            onChange={(e) => setProfileData({ ...profileData, profile: { ...profileData.profile, about: e.target.value } })}
            className="bg-zinc-700 text-zinc-100 px-3 py-1 mt-2 rounded-md w-full"
          />
        </div>
      </section>

      {/* Skills Section */}
      <section className="mb-8">
        <h3 className="text-xl text-zinc-400 font-semibold border-b-2 border-gray-200 pb-1">Skills</h3>
        {profileData.skills.map((skill, index) => (
          <input
            key={index}
            value={skill.skillName}
            onChange={(e) =>
              setProfileData((prevData) => {
                const newSkills = [...prevData.skills];
                newSkills[index].skillName = e.target.value;
                return { ...prevData, skills: newSkills };
              })
            }
            className="bg-zinc-700 text-zinc-100 px-3 py-1 mt-2 rounded-md w-full"
          />
        ))}
        <button onClick={toggleSkillModal} className="bg-blue-500 text-white py-2 px-4 mt-4 rounded-md">
          Add Skill
        </button>
        {showSkillModal && (
          <SkillModal closeModal={toggleSkillModal} addSkill={handleAddSkill} />
        )}
      </section>

      {/* Experience Section */}
      <section className="mb-8">
    <h3 className="text-xl text-zinc-400 font-semibold border-b-2 border-gray-200 pb-1">Experience</h3>
    {localExperience.map((exp, index) => (
      <div key={index} className="mt-4">
        <input
          type="text"
          placeholder="Title"
          value={exp.title}
          onChange={(e) => handleExperienceChange(index, 'title', e.target.value)}
          className="bg-zinc-700 text-zinc-100 px-3 py-1 mt-2 rounded-md w-full"
        />
        <input
          type="text"
          placeholder="Company"
          value={exp.company}
          onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
          className="bg-zinc-700 text-zinc-100 px-3 py-1 mt-2 rounded-md w-full"
        />
        <input
          type="text"
          placeholder="Duration"
          value={exp.duration}
          onChange={(e) => handleExperienceChange(index, 'duration', e.target.value)}
          className="bg-zinc-700 text-zinc-100 px-3 py-1 mt-2 rounded-md w-full"
        />
        <textarea
          placeholder="Description"
          value={exp.description}
          onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
          className="bg-zinc-700 text-zinc-100 px-3 py-1 mt-2 rounded-md w-full"
        />
      </div>
    ))}
    <button onClick={handleAddExperience} className="bg-green-500 text-white py-2 px-4 mt-4 rounded-md">
      Add Experience
    </button>
    
  </section>

      {/* Education Section */}
      <section className="mb-8">
    <h3 className="text-xl text-zinc-400 font-semibold border-b-2 border-gray-200 pb-1">Education</h3>
    {localEducation.map((edu, index) => (
      <div key={index} className="mt-4">
        <input
          type="text"
          placeholder="Degree"
          value={edu.degree}
          onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
          className="bg-zinc-700 text-zinc-100 px-3 py-1 mt-2 rounded-md w-full"
        />
        <input
          type="text"
          placeholder="University"
          value={edu.university}
          onChange={(e) => handleEducationChange(index, 'university', e.target.value)}
          className="bg-zinc-700 text-zinc-100 px-3 py-1 mt-2 rounded-md w-full"
        />
        <input
          type="text"
          placeholder="Graduation Year"
          value={edu.graduation}
          onChange={(e) => handleEducationChange(index, 'graduation', e.target.value)}
          className="bg-zinc-700 text-zinc-100 px-3 py-1 mt-2 rounded-md w-full"
        />
      </div>
    ))}
    <button onClick={handleAddEducation} className="bg-blue-500 text-white py-2 px-4 mt-4 rounded-md">
      Add Education
    </button>
  </section>

      

      {/* Save Button */}
      <div className="flex justify-center mt-8">
        <button onClick={handleSave} className="bg-green-500 text-white py-2 px-6 rounded-md">
          Save Profile
        </button>
      </div>
    </div>
  );
}

export default ProfileEdit;
