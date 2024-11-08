import React, { useState, useEffect } from 'react';
// import Dp from './rcbg.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faSearch } from '@fortawesome/free-solid-svg-icons';

const Chatlist = ({ onSelectChat }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      );
      const data = await response.json();
      setChats(data);
    } catch (error) {
      console.error('Error fetching chat data:', error);
    }
  };

  return (
    <div className="border border-white  p-2  h-screen w-full">
      <div className="mb-2">
        <h1 className="text-white font-bold text-lg md:text-2xl">Chats</h1>
        <div className="bg-gray-800 rounded-3xl border border-white w-full md:w-64 m-1 flex items-center hover:border-green-400">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-white p-2 w-full outline-none"
          />
          <FontAwesomeIcon icon={faSearch} className="text-white p-2" />
        </div>
      </div>

      <div className="h-full md:h-5/6 overflow-y-scroll overflow-x-hidden space-y-3 p-2">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className="h-16 md:h-20 w-full bg-gray-900 rounded-lg flex items-center p-2 mt-2 border border-white hover:bg-zinc-800 cursor-pointer"
            onClick={() => onSelectChat(chat)}
          >
            <img
              src={chat.profilePic}
              alt="Profile"
              className="rounded-full h-10 w-10 md:h-12 md:w-12 mr-3"
            />
            <div className="flex-1">
              <p className="text-white font-semibold text-sm md:text-base">
                {chat.name}
              </p>
              <p className="text-gray-400 text-xs md:text-sm">
                {chat.latestMessage || 'No new messages'}
              </p>
            </div>
            <FontAwesomeIcon
              icon={faPencil}
              className="text-red-900 text-sm md:text-base"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chatlist;
