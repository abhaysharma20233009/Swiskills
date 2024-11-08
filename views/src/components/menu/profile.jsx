// src/components/Profile.js
import React, { useState } from 'react';
import SkillModal from './SkillModal';

function Profile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [skills, setSkills] = useState([
    'JavaScript',
    'React',
    'Node.js',
    'HTML & CSS',
  ]);
  const [editState, setEditState] = useState({
    name: 'John Doe',
    title: 'Software Engineer | React Developer | Tech Enthusiast',
    location: 'San Francisco, CA',
    about:
      'Experienced software engineer with a passion for building web applications and optimizing user experiences. Skilled in React, JavaScript, and Node.js.',
    experience: {
      title: 'Frontend Developer',
      company: 'Tech Company Inc.',
      duration: 'January 2020 - Present',
      description:
        'Developed responsive web applications using React and Redux...',
    },
    education: {
      degree: 'Bachelor of Science in Computer Science',
      university: 'University of XYZ',
      graduation: 'Graduated: 2019',
    },
  });
  const [editMode, setEditMode] = useState({});

  const handleEditToggle = (section) => {
    setEditMode((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleChange = (section, field, value) => {
    setEditState((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const addSkill = (newSkill) => {
    if (!skills.includes(newSkill)) {
      setSkills((prevSkills) => [...prevSkills, newSkill]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans bg-zinc-800">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="relative">
          <img
            className="w-full h-48 object-cover rounded-lg"
            src="background-image-url.jpg"
            alt="background"
          />
          <div className="relative -mt-16 flex justify-center">
            <img
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              src="profile-photo-url.jpg"
              alt="profile"
            />
          </div>
        </div>
        {editMode.header ? (
          <>
            <input
              type="text"
              value={editState.name}
              onChange={(e) => handleChange('name', null, e.target.value)}
              className="text-3xl font-semibold mt-4"
            />
            <input
              type="text"
              value={editState.title}
              onChange={(e) => handleChange('title', null, e.target.value)}
              className="text-gray-100"
            />
            <input
              type="text"
              value={editState.location}
              onChange={(e) => handleChange('location', null, e.target.value)}
              className="text-gray-100"
            />
            <button
              onClick={() => handleEditToggle('header')}
              className="mt-2 bg-blue-500 text-white py-1 px-2 rounded-md"
            >
              Save
            </button>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-semibold mt-4">{editState.name}</h1>
            <p className="text-gray-100">{editState.title}</p>
            <p className="text-gray-100">{editState.location}</p>
            <button
              onClick={() => handleEditToggle('header')}
              className="mt-2 bg-blue-500 text-white py-1 px-2 rounded-md"
            >
              Edit
            </button>
          </>
        )}
      </div>

      {/* About Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold border-b-2 border-gray-200 pb-1">
          About
        </h2>
        {editMode.about ? (
          <>
            <textarea
              value={editState.about}
              onChange={(e) => handleChange('about', null, e.target.value)}
              className="text-gray-100 mt-4 w-full"
            />
            <button
              onClick={() => handleEditToggle('about')}
              className="mt-2 bg-blue-500 text-white py-1 px-2 rounded-md"
            >
              Save
            </button>
          </>
        ) : (
          <>
            <p className="text-gray-100 mt-4">{editState.about}</p>
            <button
              onClick={() => handleEditToggle('about')}
              className="mt-2 bg-blue-500 text-white py-1 px-2 rounded-md"
            >
              Edit
            </button>
          </>
        )}
      </section>

      {/* Experience Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold border-b-2 border-gray-200 pb-1">
          Experience
        </h2>
        {editMode.experience ? (
          <>
            <input
              type="text"
              value={editState.experience.title}
              onChange={(e) =>
                handleChange('experience', 'title', e.target.value)
              }
              className="text-lg font-semibold"
            />
            <input
              type="text"
              value={editState.experience.company}
              onChange={(e) =>
                handleChange('experience', 'company', e.target.value)
              }
              className="text-gray-200"
            />
            <input
              type="text"
              value={editState.experience.duration}
              onChange={(e) =>
                handleChange('experience', 'duration', e.target.value)
              }
              className="text-gray-200"
            />
            <textarea
              value={editState.experience.description}
              onChange={(e) =>
                handleChange('experience', 'description', e.target.value)
              }
              className="text-gray-200 mt-2 w-full"
            />
            <button
              onClick={() => handleEditToggle('experience')}
              className="mt-2 bg-blue-500 text-white py-1 px-2 rounded-md"
            >
              Save
            </button>
          </>
        ) : (
          <>
            <h3 className="text-lg font-semibold">
              {editState.experience.title}
            </h3>
            <p className="text-gray-200">{editState.experience.company}</p>
            <p className="text-gray-200">{editState.experience.duration}</p>
            <p className="text-gray-200 mt-2">
              {editState.experience.description}
            </p>
            <button
              onClick={() => handleEditToggle('experience')}
              className="mt-2 bg-blue-500 text-white py-1 px-2 rounded-md"
            >
              Edit
            </button>
          </>
        )}
      </section>

      {/* Education Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold border-b-2 border-gray-200 pb-1">
          Education
        </h2>
        {editMode.education ? (
          <>
            <input
              type="text"
              value={editState.education.degree}
              onChange={(e) =>
                handleChange('education', 'degree', e.target.value)
              }
              className="text-lg font-semibold"
            />
            <input
              type="text"
              value={editState.education.university}
              onChange={(e) =>
                handleChange('education', 'university', e.target.value)
              }
              className="text-gray-200"
            />
            <input
              type="text"
              value={editState.education.graduation}
              onChange={(e) =>
                handleChange('education', 'graduation', e.target.value)
              }
              className="text-gray-200"
            />
            <button
              onClick={() => handleEditToggle('education')}
              className="mt-2 bg-blue-500 text-white py-1 px-2 rounded-md"
            >
              Save
            </button>
          </>
        ) : (
          <>
            <h3 className="text-lg font-semibold">
              {editState.education.degree}
            </h3>
            <p className="text-gray-200">{editState.education.university}</p>
            <p className="text-gray-200">{editState.education.graduation}</p>
            <button
              onClick={() => handleEditToggle('education')}
              className="mt-2 bg-blue-500 text-white py-1 px-2 rounded-md"
            >
              Edit
            </button>
          </>
        )}
      </section>

      {/* Skills Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold border-b-2 border-gray-200 pb-1">
          Skills
        </h2>
        <ul className="flex flex-wrap mt-4 space-x-2 space-y-2">
          {skills.map((skill) => (
            <li
              key={skill}
              className="bg-blue-100 text-blue-700 py-1 px-3 rounded-full"
            >
              {skill}
            </li>
          ))}
        </ul>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Add Skill
        </button>
      </section>

      {isModalOpen && (
        <SkillModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddSkill={addSkill}
        />
      )}
    </div>
  );
}

export default Profile;
