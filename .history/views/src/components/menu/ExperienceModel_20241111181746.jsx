import React, { useState } from 'react';

function ExperienceModal({ closeModal, addExperience }) {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addExperience({ title, company, duration, description });
    closeModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded p-4 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Add Experience</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            placeholder="Duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="border p-2 mb-2 w-full"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 mb-4 w-full"
          />
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            Add Experience
          </button>
        </form>
        <button onClick={closeModal} className="mt-2 text-red-500">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ExperienceModal;
