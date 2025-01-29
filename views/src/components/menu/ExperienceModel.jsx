import React, { useState } from 'react';

const ExperienceModal = ({ closeModal, addExperience }) => {
  const [experience, setExperience] = useState({ title: '', company: '', duration: '', description: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExperience((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addExperience(experience);
    closeModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded-md shadow-lg">
        <h2 className="text-lg font-bold mb-4">Add Experience</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={experience.title}
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded"
            required
          />
          <input
            type="text"
            name="company"
            placeholder="Company"
            value={experience.company}
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded"
            required
          />
          <input
            type="text"
            name="duration"
            placeholder="Duration"
            value={experience.duration}
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={experience.description}
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded"
            required
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
          <button type="button" onClick={closeModal} className="ml-2 bg-gray-300 px-4 py-2 rounded">Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default ExperienceModal;
