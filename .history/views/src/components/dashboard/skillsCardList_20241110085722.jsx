import React, { useState, useEffect } from 'react';
import ExploreCard from './skillsCard'; // Import the ExploreCard component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const ExploreCardList = () => {
  const [skills, setSkills] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [pageSize] = useState(9); // Number of items per page (9 cards)

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true); // Start loading when fetching
        const response = await axios('/api/v1/skills'); // API endpoint
        setSkills(response.data.data.data); // Set the skills data
      } catch (err) {
        setError('Failed to load skills.');
        console.error('Error:', err.response?.data?.message || err.message);
      } finally {
        setLoading(false); // Stop loading after fetching
      }
    };

    fetchSkills(); // Fetch skills data on component mount
  }, []);

  const [searchTerm, setSearchTerm] = useState('');

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

  // Handle navigating to the next set of cards
  const handleNext = () => {
    if (currentPage * pageSize < filteredAndSortedCards.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Handle navigating to the previous set of cards
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <>
      {/* Search Bar */}
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

        {/* Navigation Arrows */}
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1} // Disable if on the first page
            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-700 disabled:bg-gray-400"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        </div>
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
          <button
            onClick={handleNext}
            disabled={currentPage * pageSize >= filteredAndSortedCards.length} // Disable if on the last page
            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-700 disabled:bg-gray-400"
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
    </>
  );
};

export default ExploreCardList;
