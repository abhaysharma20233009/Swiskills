import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';

function SendRequestForm({ onClose, onRequestSuccess }) {
  const [username, setUsername] = useState('');
  const [requireSkills, setRequireSkills] = useState('');
  const [message, setMessage] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]); // Manage selected skills
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState([]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  // Fetch skills from the API
  const fetchSkills = async () => {
    if (query.length <= 1) return; // Avoid fetching if the query is too short
    setLoading(true);
    try {
      const response = await axios('/api/v1/skills');
      setSkills(response.data.data);
    } catch (err) {
      setError('Failed to load skills.');
    } finally {
      setLoading(false);
    }
  };

  // Handle query change and fetch skills
  const handleQueryChange = (e) => {
    setQuery(e.target.value);
    fetchSkills();
  };

  // Toggle selection of skills
  const toggleSkillSelection = (skill) => {
    setSelectedSkills((prevSkills) =>
      prevSkills.includes(skill)
        ? prevSkills.filter((s) => s !== skill)
        : [...prevSkills, skill]
    );
  };

  // Handle request submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestData = {
      username,
      requireSkills: selectedSkills, // Include selected skills in the request
      message,
    };

    try {
      const response = await axios.post('/api/v1/requests', requestData);
      if (response.status === 200) {
        onRequestSuccess(); // Notify parent about successful request
        onClose(); // Close the modal
      }
    } catch (err) {
      console.error('Error:', err?.response?.data?.message || err?.message);
      setError('Failed to send request.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg bg-gray-900 p-8 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-white mb-4">Send Connection Request</h2>
      
      <label className="text-white">Username</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-2 mb-4 bg-gray-700 text-white rounded-md"
        placeholder="Enter username"
      />

      <label className="text-white">Message</label>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full p-2 mb-4 bg-gray-700 text-white rounded-md"
        placeholder="Write a message (optional)"
      ></textarea>

      <label className="text-white">Skills</label>
      <input
        type="text"
        value={query}
        onChange={handleQueryChange}
        placeholder="Search for skills..."
        className="w-full p-2 mb-4 bg-gray-700 text-white rounded-md"
      />
      
      <div className="flex flex-col gap-2 mb-4">
        {loading ? (
          <div className="text-gray-500">Loading skills...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          skills
            .filter((skill) => skill.name.toLowerCase().includes(query.toLowerCase()))
            .map((skill) => (
              <div
                key={skill.id}
                onClick={() => toggleSkillSelection(skill.name)}
                className={`cursor-pointer p-2 rounded-md ${selectedSkills.includes(skill.name) ? 'bg-green-200' : 'hover:bg-gray-200'}`}
              >
                {skill.name}
                {selectedSkills.includes(skill.name) && (
                  <FaCheckCircle className="text-green-500 absolute top-2 right-2" />
                )}
              </div>
            ))
        )}
      </div>

      {selectedSkills.length > 0 && (
        <div className="text-white mb-4">
          <strong>Selected Skills:</strong>
          <ul>
            {selectedSkills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex justify-between items-center mt-4">
        <button
          type="submit"
          disabled={loading || !username || selectedSkills.length === 0}
          className="py-2 px-4 rounded-md bg-blue-500 text-white disabled:bg-gray-500"
        >
          {loading ? 'Sending...' : 'Send Request'}
        </button>
        <button
          onClick={onClose}
          className="py-2 px-4 border border-gray-400 rounded-md text-gray-600 hover:bg-gray-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default SendRequestForm;
