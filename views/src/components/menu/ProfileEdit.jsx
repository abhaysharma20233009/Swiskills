import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { FaCamera } from 'react-icons/fa';



function ProfileEdit() {
  const location = useLocation();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    profile: location.state?.profileData?.profile || { name: '', title: '', location: '', about: '' },
    skills: Array.isArray(location.state?.profileData?.skills)
      ? location.state.profileData.skills
      : [{ skillName: '' }],
    experience: Array.isArray(location.state?.profileData?.experience)
      ? location.state.profileData.experience
      : [{ title: '', company: '', duration: '', description: '' }],
    education: Array.isArray(location.state?.profileData?.education)
      ? location.state.profileData.education
      : [{ degree: '', university: '', graduation: '' }],
  });

  const [bannerImage, setBannerImage] = useState(location.state?.profileData?.bannerImage || '');
  const [profileImage, setProfileImage] = useState(location.state?.profileData?.profileImage || '');

  const handleAddSkill = () => {
    setProfileData((prevData) => ({
      ...prevData,
      skills: [...prevData.skills, { skillName: '' }],
    }));
  };

  const handleAddExperience = () => {
    setProfileData((prevData) => ({
      ...prevData,
      experience: [...prevData.experience, { title: '', company: '', duration: '', description: '' }],
    }));
  };

  const handleAddEducation = () => {
    setProfileData((prevData) => ({
      ...prevData,
      education: [...prevData.education, { degree: '', university: '', graduation: '' }],
    }));
  };

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (type === 'banner') {
      setBannerImage(file); // Directly store the file
    } else if (type === 'profile') {
      setProfileImage(file); // Directly store the file
    }
  };
  

  
    const handleSave = async () => {
      const data = {
        profile: profileData.profile,
        skills: profileData.skills,
        experience: profileData.experience,
        education: profileData.education,
      };
     console.log(data);
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
        console.log('Error:', err.response?.data?.message || err.message);
      }
  
  
  };
  

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
      {/* Banner Image Upload Icon */}
      <label className="absolute top-4 right-4 cursor-pointer text-white ">
        <input
          type="file"
          onChange={(e) => handleImageUpload(e, 'banner')}
          className="hidden"
        />
        <FaCamera className="text-3xl bg-transparent hover:bg-slate-500 p-2 rounded-full shadow-lg" />
      </label>
      
      {/* Profile Image Preview */}
      <div className="relative -mt-16 flex justify-center">
        <img
          className="w-32 h-32 rounded-full border-4 border-green-400 shadow-lg"
          src={profileImage || '/default-profile.jpg'} // Placeholder if no profile image
          alt="Profile"
        />
        {/* Profile Image Upload Icon */}
        <label className="absolute mt-28 cursor-pointer">
          <input
            type="file"
            onChange={(e) => handleImageUpload(e, 'profile')}
            className="hidden"
          />
          <FaCamera className="text-3xl text-white bg-slate-400 hover:bg-slate-500 p-2 rounded-full shadow-lg h-8 w-8" />
        </label>
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
        <button onClick={handleAddSkill} className="bg-blue-500 text-white py-2 px-4 mt-4 rounded-md">
          Add Skill
        </button>
      </section>

      {/* Experience Section */}
      <section className="mb-8">
        <h3 className="text-xl text-zinc-400 font-semibold border-b-2 border-gray-200 pb-1">Experience</h3>
        {profileData.experience.map((exp, index) => (
          <div key={index} className="mt-4">
            <input
              type="text"
              placeholder="Title"
              value={exp.title}
              onChange={(e) =>
                setProfileData((prevData) => {
                  const newExperience = [...prevData.experience];
                  newExperience[index].title = e.target.value;
                  return { ...prevData, experience: newExperience };
                })
              }
              className="bg-zinc-700 text-zinc-100 px-3 py-1 mt-2 rounded-md w-full"
            />
            <input
              type="text"
              placeholder="Company"
              value={exp.company}
              onChange={(e) =>
                setProfileData((prevData) => {
                  const newExperience = [...prevData.experience];
                  newExperience[index].company = e.target.value;
                  return { ...prevData, experience: newExperience };
                })
              }
              className="bg-zinc-700 text-zinc-100 px-3 py-1 mt-2 rounded-md w-full"
            />
            <input
              type="text"
              placeholder="Duration"
              value={exp.duration}
              onChange={(e) =>
                setProfileData((prevData) => {
                  const newExperience = [...prevData.experience];
                  newExperience[index].duration = e.target.value;
                  return { ...prevData, experience: newExperience };
                })
              }
              className="bg-zinc-700 text-zinc-100 px-3 py-1 mt-2 rounded-md w-full"
            />
            <textarea
              placeholder="Description"
              value={exp.description}
              onChange={(e) =>
                setProfileData((prevData) => {
                  const newExperience = [...prevData.experience];
                  newExperience[index].description = e.target.value;
                  return { ...prevData, experience: newExperience };
                })
              }
              className="bg-zinc-700 text-zinc-100 px-3 py-1 mt-2 rounded-md w-full"
            />
          </div>
        ))}
        <button onClick={handleAddExperience} className="bg-blue-500 text-white py-2 px-4 mt-4 rounded-md">
          Add Experience
        </button>
      </section>

      {/* Education Section */}
      <section className="mb-8">
        <h3 className="text-xl text-zinc-400 font-semibold border-b-2 border-gray-200 pb-1">Education</h3>
        {profileData.education.map((edu, index) => (
          <div key={index} className="mt-4">
            <input
              type="text"
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) =>
                setProfileData((prevData) => {
                  const newEducation = [...prevData.education];
                  newEducation[index].degree = e.target.value;
                  return { ...prevData, education: newEducation };
                })
              }
              className="bg-zinc-700 text-zinc-100 px-3 py-1 mt-2 rounded-md w-full"
            />
            <input
              type="text"
              placeholder="University"
              value={edu.university}
              onChange={(e) =>
                setProfileData((prevData) => {
                  const newEducation = [...prevData.education];
                  newEducation[index].university = e.target.value;
                  return { ...prevData, education: newEducation };
                })
              }
              className="bg-zinc-700 text-zinc-100 px-3 py-1 mt-2 rounded-md w-full"
            />
            <input
              type="text"
              placeholder="Graduation Year"
              value={edu.graduation}
              onChange={(e) =>
                setProfileData((prevData) => {
                  const newEducation = [...prevData.education];
                  newEducation[index].graduation = e.target.value;
                  return { ...prevData, education: newEducation };
                })
              }
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
