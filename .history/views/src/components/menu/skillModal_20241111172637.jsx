import React, { useState, useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';

function SkillModal({ closeModal, addSkill }) {
  const [query, setQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [skills, setSkills] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState();

  useEffect(() => {
    const fetchSkills = async () => {
      if (query.length <= 1) return;

      setError(null);
      try {
        setLoading(true); // Start loading
        const response = await axios('/api/v1/skills'); // API call
        console.log(response); // Check the API response
        // Check if the data structure is correct
        if (response) {
          setSkills(response.data.data.data); // Set skills data
        } else {
          setSkills([]); // Clear if structure is unexpected
        }
      } catch (err) {
        setError('Failed to load skills.');
        console.error(err); // Log error details
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchSkills();
  }, [query]);

  // Filter and sort skills
  const filteredAndSortedSkills = skills
    .filter((skill) => skill.name.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => {
      const aMatches = a.name.toLowerCase().includes(query.toLowerCase());
      const bMatches = b.name.toLowerCase().includes(query.toLowerCase());
      return bMatches - aMatches;
    });

  // Paginate skills (if pagination is needed)
  const paginatedSkills = filteredAndSortedSkills.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const toggleSkillSelection = (skill) => {
    setSelectedSkills((prevSkills) =>
      prevSkills.includes(skill)
        ? prevSkills.filter((s) => s !== skill)
        : [...prevSkills, skill]
    );
  };

  const handleAddSkills = () => {
    selectedSkills.forEach(addSkill); // Add selected skills
    setSelectedSkills([]); // Reset selections
    closeModal(); // Close modal
  };

  const isAddButtonEnabled = selectedSkills.length > 0;

  return (
    <div className="modal-overlay fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="modal-content bg-white rounded-lg p-6 w-96 relative">
        <h2 className="text-lg font-semibold mb-4">Add Skills</h2>
        <button onClick={closeModal} className="close-button text-gray-500 hover:text-gray-700 absolute top-2 right-2">&times;</button>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a skill..."
          className="w-full p-2 border border-gray-400 rounded-md mb-4"
        />
        <div className="relative">
          <div className="flex flex-col gap-4 p-4">
            {loading ? (
              <div className="text-gray-500">Loading...</div>
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : (
              paginatedSkills.length > 0 ? (
                paginatedSkills.map((skill) => (
                  <div
                    key={skill.id}
                    onClick={() => toggleSkillSelection(skill.name)}
                    className={`cursor-pointer p-2 rounded-md ${selectedSkills.includes(skill.name) ? 'bg-green-200' : 'hover:bg-gray-200'}`}
                  >
                    {skill.name}
                    {selectedSkills.includes(skill.name) && <FaCheckCircle className="text-green-500 absolute top-2 right-2" />}
                  </div>
                ))
              ) : (
                <div className="text-gray-500">No skills found.</div>
              )
            )}
          </div>
        </div>
        <button
          onClick={handleAddSkills}
          disabled={!isAddButtonEnabled}
          className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md w-full"
        >
          Add
        </button>
        <button onClick={}>cancel</button>
      </div>
    </div>
  );
}

export default SkillModal;
