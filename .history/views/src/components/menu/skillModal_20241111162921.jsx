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
     <div className="relative">
        {/* Cards container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {loading ? (
            <div className="text-white">Loading...</div> // Show loading text while fetching
          ) : error ? (
            <div className="text-red-500">{error}</div> // Show error if any
          ) : (
            paginatedSkills.map((card) => (
              <ExploreCard
                key={card.id}
                name={card.name}
                image={card.img}
                enrolledUsers={card.enrolledUsers}
              />
            ))
          )}
        </div>
        </div>
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
