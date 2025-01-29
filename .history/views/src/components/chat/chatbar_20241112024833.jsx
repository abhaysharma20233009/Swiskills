import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
const Chatlist = ({ onSelectChat }) => {
  const [chats, setChats] = useState([]); // Ensure chats is always an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const variable=location.state?.userProfile;
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch('/api/v1/users'); // API endpoint
      
        if (!response.ok) {
          throw new Error('Failed to fetch chats');
        }
        const data = await response.json();
        console.log('API Response:', data);
        // Check if the data has the expected structure (status, result, and result.data being an array)
        if (data.status === 'success' && Array.isArray(data.data.data)) {
          setChats(data.data.data); // Set chats only if data is an array
          if(variable)setChats(variable);
        } else {
          throw new Error('Invalid data format');
        }
      } catch (error) {
        setError(error.message); // Handle any errors
        console.error("Error fetching chats:", error);
      } finally {
        setLoading(false); // Set loading to false after the API call is complete
      }
    };

    fetchChats(); // Call the function to fetch data
  }, []); // Empty dependency array to run only once on component mount
 
  const [searchTerm, setSearchTerm] = useState('');

  // Filter chats based on search term
  const filteredChats = chats.filter((chat) =>
    chat.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="text-white">Loading...</div>; // Show loading state
  }

  if (error) {
    return <div className="text-red-500">{error}</div>; // Show error if there's any
  }

  return (
    <div className="border border-white p-2 h-screen w-full">
      {/* Header and Search Bar */}
      <div className="mb-2">
        <h1 className="text-white font-bold text-lg md:text-2xl">Chats</h1>
        <div className="bg-gray-800 rounded-3xl border border-white w-full md:w-64 m-1 flex items-center hover:border-green-400">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent text-white p-2 w-full outline-none"
          />
          <FontAwesomeIcon icon={faSearch} className="text-white p-2" />
        </div>
      </div>

      {/* Chat List */}
      <div className="h-full md:h-5/6 overflow-y-scroll overflow-x-hidden space-y-3 p-2">
        {filteredChats.map((chat) => (
          <div
            key={chat._id} // Ensure each item has a unique key
            className="h-16 md:h-20 w-full bg-gray-900 rounded-lg flex items-center p-2 mt-2 border border-white hover:bg-zinc-800 cursor-pointer"
            onClick={() => onSelectChat(chat)}
          >
            {/* Profile Picture */}
            <img
              src={chat.profilePicture || 'copy.jpg'} // Fallback if profile picture is not provided
              alt="Profile"
              className="rounded-full h-10 w-10 md:h-12 md:w-12 mr-3"
            />
            {/* Chat Details */}
            <div className="flex-1">
              <p className="text-white font-semibold text-sm md:text-base">{chat.username}</p>
             
            </div>
            {/* Options Icon */}
            <button onClick={(e) => {
              e.stopPropagation(); // Prevents triggering onSelectChat
              console.log('Options for', chat.username); // Placeholder for further actions
            }}>
              <FontAwesomeIcon icon={faEllipsisV} className="text-red-100 text-sm md:text-base" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chatlist;
