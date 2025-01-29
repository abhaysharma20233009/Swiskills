import React, { useState } from 'react';
import Chatlist from './chatbar';
import ChatBox from './chatbox';

const Chats = () => {
  const [selectedChat, setSelectedChat] = useState(null);
 

  // Function to select a user chat from Chatlist
  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-10/12 mx-auto bg-zinc-800">
     
      {/* Chat List and Chat Box */}
      <div className="flex w-full">
        <div className="w-4/12">
          <Chatlist onSelectChat={handleSelectChat} />
        </div>
        <div className="flex-1 w-full">
          {selectedChat ? (
            <ChatBox chatUser={selectedChat}/>
          ) : (
            // <p className="text-center mt-10 text-gray-100">Select a chat to start messaging</p>
            <img src="./chatsbanner.png" alt="start messaging" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Chats;
