import React, { useState } from 'react';
import Chatlist from './chatbar';
import ChatBox from './chatbox';
import { ArrowLeft } from 'lucide-react';

const Chats = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
  };

  const handleBackToList = () => {
    setSelectedChat(null);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-zinc-800 md:flex-row md:w-10/12 md:mx-auto">
      {/* Chat List for Desktop & Mobile */}
      <div className={`w-full md:w-4/12 ${selectedChat ? 'hidden md:block' : 'block'}`}>
        <Chatlist onSelectChat={handleSelectChat} />
      </div>

      {/* Chat Box Area */}
      <div className={`w-full md:flex-1 ${!selectedChat ? 'hidden md:block' : 'block'}`}>
        {selectedChat ? (
          <div className="relative h-full">
            {/* Back Button for Mobile */}
            <button
              onClick={handleBackToList}
              className="md:hidden text-white p-2 flex items-center gap-2 bg-zinc-700 w-full"
            >
              <ArrowLeft size={20} />
              Back to Chats
            </button>
            <ChatBox chatUser={selectedChat} />
          </div>
        ) : (
          <div className="flex justify-center items-center h-full">
            <img
              src="./chatsbanner.png"
              alt="start messaging"
              className="max-w-xs w-full"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Chats;
