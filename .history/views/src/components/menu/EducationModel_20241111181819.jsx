import React, { useState } from 'react';

function EducationModal({ closeModal, addEducation }) {
  const [degree, setDegree] = useState('');
  const [university, setUniversity] = useState('');
  const [graduation, setGraduation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addEducation({ degree, university, graduation });
    closeModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded p-4 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Add Education</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Degree"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            placeholder="University"
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            placeholder="Graduation Year"
            value={graduation}
            onChange={(e) => setGraduation(e.target.value)}
            className="border p-2 mb-4 w-full"
          />
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            Add Education
          </button>
        </form>
        <button onClick={closeModal} className="mt-2 text-red-500">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EducationModal;
