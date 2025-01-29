import React, { useState } from 'react';

const EducationModal = ({ closeModal, addEducation }) => {
  const [education, setEducation] = useState({ degree: '', university: '', graduation: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEducation((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addEducation(education);
    closeModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded-md shadow-lg">
        <h2 className="text-lg font-bold mb-4">Add Education</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="degree"
            placeholder="Degree"
            value={education.degree}
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded"
            required
          />
          <input
            type="text"
            name="university"
            placeholder="University"
            value={education.university}
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded"
            required
          />
          <input
            type="text"
            name="graduation"
            placeholder="Graduation Year"
            value={education.graduation}
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

export default EducationModal;
