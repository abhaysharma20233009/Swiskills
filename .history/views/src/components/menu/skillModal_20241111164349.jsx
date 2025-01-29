import React, { useState, useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import getSkillByName from '../../api/getSkillByName';

function SkillModal({ closeModal, addSkill }) {
  const [query, setQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [error, setError] = useState(null);
  const [isSearchEnabled, setIsSearchEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [skills, setSkills] = useState([]); // This stores the search results
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [pageSize] = useState(9); 
  useEffect(() => {
    setIsSearchEnabled(query.length > 1);
    const fetchSkills = async () => {
      if (query.length <= 1) return;

      setError(null); 
      try {
        setLoading(true); // Start loading when fetching
        const response = await getSkillByName(query); // API endpoint
        console.log(response.data.data.data)
        setSkills(response.data.data.data); // Set the skills data
      } catch (err) {
        setError('Failed to load skills.');
        console.error('Error:', err.response?.data?.message || err.message);
      } finally {
        setLoading(false); // Stop loading after fetching
      }
      console.log(skills);
    };

    fetchSkills();
  }, [query]);

  const toggleSkillSelection = (skill) => {
    setSelectedSkills((prevSkills) =>
      prevSkills.includes(skill)
        ? prevSkills.filter((s) => s !== skill)
        : [...prevSkills, skill]
    );
  };

    // Filter and reorder cards based on search term
    const filteredAndSortedCards = skills
    .filter((skill) =>
      skill.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      // Sort matching cards to the top
      const aMatches = a.name.toLowerCase().includes(searchTerm.toLowerCase());
      const bMatches = b.name.toLowerCase().includes(searchTerm.toLowerCase());
      return bMatches - aMatches; // Prioritize matching cards
    });

  // Slice the skills array to display only the current page's cards
  const paginatedSkills = filteredAndSortedCards.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
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
