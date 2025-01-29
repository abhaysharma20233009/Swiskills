import React, { useState, useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import getSkillByName from '../../api/getSkillByName';

function SkillModal({ closeModal, addSkill }) {
  const [query, setQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [error, setError] = useState(null);
  const [isSearchEnabled, setIsSearchEnabled] = useState(false);
  const [skills, setSkills] = useState([]); // This stores the search results

  useEffect(() => {
    setIsSearchEnabled(query.length > 1);
  }, [query]);

  const toggleSkillSelection = (skill) => {
    setSelectedSkills((prevSkills) =>
      prevSkills.includes(skill)
        ? prevSkills.filter((s) => s !== skill)
        : [...prevSkills, skill]
    );
  };

  const handleSearch = async () => {
    if (query.length <= 1) return;

    setError(null); // Reset the error

    try {
      const skills = await getSkillByName(query);
      console.log(skills);
      if (skills && skills.length > 0) {
        setSkills(skills); // Set the skills if found
      } else {
        setError('No skills found');
        setSkills([]); // Clear skills if none are found
      }
    } catch {
      setError('Failed to load suggestions');
      setSkills([]); // Clear skills on error
    }
  };

  const handleAddSkills = () => {
    selectedSkills.forEach(addSkill); // Add selected skills
    setSelectedSkills([]); // Reset selected skills
    closeModal(); // Close the modal
  };

  const isAddButtonEnabled = skills.length > 0 && selectedSkills.length > 0; // Enable "Add" if skills are found and selected

  return (
    <div className="modal-overlay fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="modal-content bg-white rounded-lg p-6 w-96 relative">
        <h2 className="text-lg font-semibold mb-4">Add Skills</h2>
        <button
          onClick={closeModal}
          className="close-button text-gray-500 hover:text-gray-700 absolute top-2 right-2"
        >
          &times;
        </button>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a skill..."
          className="w-full p-2 border border-gray-400 rounded-md"
        />
        <button
          onClick={handleSearch}
          disabled={!isSearchEnabled}
          className={`mt-2 ${
            isSearchEnabled ? 'bg-blue-500' : 'bg-gray-500'
          } text-white py-2 px-4 rounded-md w-full`}
        >
          Search
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}{' '}
        {/* Show error message */}
        {skills.length > 0 && ( // Show skills only if found
          <ul className="bg-white border border-gray-300 rounded-md mt-2 max-h-40 overflow-y-auto">
            {skills.map((skill) => (
              <li
                key={skill}
                onClick={() => toggleSkillSelection(skill)}
                className={`p-2 cursor-pointer flex items-center justify-between ${
                  selectedSkills.includes(skill)
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-blue-500 hover:text-white'
                }`}
              >
                {skill}
                {selectedSkills.includes(skill) && (
                  <FaCheckCircle className="ml-2 text-green-500" />
                )}
              </li>
            ))}
          </ul>
        )}
        {/* Add button */}
        <button
          onClick={handleAddSkills}
          disabled={!isAddButtonEnabled} // Disable the "Add" button if no skills are selected
          className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md w-full"
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default SkillModal;
