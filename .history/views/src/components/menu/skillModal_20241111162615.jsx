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
      <div className="flex-grow sm:flex justify-center ml-2">
        <div className="flex items-center border border-white rounded-full px-1 py-1 md:px-6 h-8 md:h-10 w-full md:w-96">
          <input
            type="text"
            placeholder="Search here..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent text-white placeholder-gray-400 w-full focus:outline-none"
          />
          <FontAwesomeIcon icon={faSearch} className="text-white ml-2" />
        </div>
      </div>

      {/* Cards Grid */}
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
