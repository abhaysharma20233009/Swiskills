import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip, faPaperPlane, faTrash } from '@fortawesome/free-solid-svg-icons';

const socket = io('http://localhost:3000');

const ChatBox = ({ chatUser }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    // Listen for incoming messages
    socket.on('chat message', (message) => {
      if (message.user === chatUser.id) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    return () => {
      socket.off('chat message');
    };
  }, [chatUser]);

  const sendMessage = () => {
    if (input.trim() === '' && !selectedFile) return;

    const messageData = {
      text: input,
      file: selectedFile ? URL.createObjectURL(selectedFile) : null,
      type: selectedFile?.type || 'text',
      user: chatUser.id,
      status: 'sent', // Set initial status as 'sent'
    };

    socket.emit('chat message', messageData);

    setMessages((prevMessages) => [...prevMessages, messageData]); // Update message locally
    setInput('');
    setSelectedFile(null);
  };

  const handleFileChange = (e) => setSelectedFile(e.target.files[0]);

  const deleteMessage = (index, forEveryone = false) => {
    const updatedMessages = [...messages];
    if (forEveryone) {
      // Notify server to delete for everyone (if permission granted)
      socket.emit('delete message', { index, forEveryone });
    }
    updatedMessages[index].text = forEveryone ? 'Message deleted' : 'Message deleted for you';
    setMessages(updatedMessages);
  };

  return (
    <div className="flex flex-col w-full   bg-transparent p-4 rounded-lg shadow-lg h-full md:h-screen">
      {/* Chat User Profile */}
      <div className="flex items-center mb-4 space-x-2">
        <img src={chatUser.img} alt="" className="rounded-full h-12 w-12 md:h-16 md:w-16" />
        <div>
          <h2 className="text-lg font-semibold text-gray-100">{chatUser.name}</h2>
          <p className="text-sm text-gray-500">Last seen at {chatUser.lastSeen || 'recently'}</p>
        </div>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto mb-4 p-2 border rounded-md bg-transparent">
        {messages.map((message, index) => (
          <div key={index} className="flex items-center justify-between my-2 p-2 bg-gray-800 w-1/2 rounded-md relative">
            <div>
              {message.text && <p className="text-gray-100">{message.text}</p>}
              {message.file && (
                message.type.startsWith('image/')
                  ? <img src={message.file} alt="Chat media" className="w-32 h-32" />
                  : <a href={message.file} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Download File</a>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {/* Seen/Unseen Ticks */}
              <span className="text-xs text-gray-500">
                {message.status === 'seen' ? '✓✓' : '✓'}
              </span>
              {/* Delete Message Icon */}
              <FontAwesomeIcon
                icon={faTrash}
                className="text-gray-400 cursor-pointer hover:text-red-400"
                onClick={() => deleteMessage(index, /* Pass true if delete for everyone */ false)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Input and Actions */}
      <div className="flex items-center space-x-2 bg-transparent border border-white">
        <input
          type="text"
          placeholder="Type a message"
          className="flex-1 p-2 border rounded-lg 
          bg-transparent focus:outline-none text-gray-800"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <input
          type="file"
          id="fileInput"
          
          className='hidden'
          onChange={handleFileChange}
        />
        <label htmlFor="fileInput" className="text-gray-600 cursor-pointer">
          <FontAwesomeIcon icon={faPaperclip} />
        </label>
        <button onClick={sendMessage} className="bg-green-400 p-2 rounded-full text-white">
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
