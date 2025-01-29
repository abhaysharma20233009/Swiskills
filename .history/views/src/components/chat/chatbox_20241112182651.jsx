import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip, faPaperPlane, faEllipsisV, faTrash, faClock, faCheck } from '@fortawesome/free-solid-svg-icons';

const socket = io("http://localhost:9000", {
  withCredentials: true,
  path: "/socket.io" // Ensure this matches the server path
});

const ChatBox = ({ chatUser }) => {
  const formatLastSeen = (date) => {
    const options = {
      year: 'numeric',
      month: 'short', // Jan, Feb, Mar, etc.
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, // 24-hour format
      timeZone: 'Asia/Kolkata', // Timezone for IST
      timeZoneName: 'short',
    };
    return new Intl.DateTimeFormat('en-IN', options).format(new Date(date));
  };
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [showOptions, setShowOptions] = useState(null);
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const messageReceivedSound = new Audio('/sounds/messagereceived.mp3');
  const messageSentSound = new Audio('/sounds/messagesent.mp3');
    // New state for error message
    
    const [lastSeen, setLastSeen] = useState(null); 
  const messagesContainerRef = useRef(null);
 
  const recipientId = chatUser._id;
   
  useEffect(() => {
    const handleMouseMove = () => {
      socket.emit('markMessagesAsSeen', { recipientId });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [recipientId]);

  useEffect(() => {
    if (recipientId) {
      socket.emit('joinRoom', { recipientId });
    }
    
    socket.on('recipientLastSeen', (data) => {
      setLastSeen(data.lastSeen); // Set last seen directly
    });
  
    socket.on('conversationHistory', (messages) => {
      setMessages(messages);
    });

    socket.on('messageReceived', (message) => {
      messageReceivedSound.play();
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    socket.on('messageError', (error) => {
      if (error.message === 'Unauthorized') {
        window.location.href = '/login';
      } else {
        setErrorMessage(error.message);
        setTimeout(() => setErrorMessage(null), 2000);
      }
    });

    socket.on('messageUpdate', (updatedMessage) => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg._id === updatedMessage._id ? { ...msg, status: updatedMessage.status, content: updatedMessage.content } : msg
        )
      );
    });
// State to store the last seen timestamp

    socket.on('isSeen', (updatedMessage) => {
     
      setMessages(updatedMessage);
     
      
    });

    socket.on('messageStatusUpdate', (updatedMessage) => {
      setMessages((prevMessages) => {
        if (prevMessages.length === 0) return prevMessages;

        const updatedMessages = [...prevMessages];
        const lastMessageIndex = updatedMessages.length - 1;

        updatedMessages[lastMessageIndex] = {
          ...updatedMessages[lastMessageIndex],
          sender: updatedMessage.sender,
          recipient: updatedMessage.recipient,
          status: updatedMessage.status,
          timestamp: updatedMessage.timestamp,
          _id: updatedMessage._id,
        };
        return updatedMessages;
      });
    });

    return () => {
      socket.off('isSeen');
      socket.off('messageReceived');
      socket.off('conversationHistory');
      socket.off('messageUpdate');
      socket.off('messageStatusUpdate');
      socket.off('messageError');
      socket.off('recipientLastSeen');
    }
  }, [recipientId]);

  const handleSendMessage = () => {
    if (input.trim() === '' && !selectedFile) return;

    if (editingMessageId) {
      socket.emit('updateMessage', {
        recipientId,
        messageId: editingMessageId,
        content: input,
      });
      setEditingMessageId(null);
    } else {
      const messageData = {
        content: input,
        status: 'pending',
      };

      displayMessage(messageData);
      socket.emit('sendMessage', {
        recipientId,
        content: input,
      });
    }

    setInput('');
    setSelectedFile(null);
  };

  const displayMessage = (msg) => {
    setMessages((prevMessages) => [...prevMessages, msg]);
    scrollToBottom(messagesContainerRef);
  };

  const scrollToBottom = (ref) => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent default behavior (like new line in textarea)
      handleSendMessage(); // Call the send message function
    }
  };

  const handleFileChange = (e) => setSelectedFile(e.target.files[0]);

  const toggleOptions = (index) => setShowOptions((prev) => (prev === index ? null : index));

  const deleteMessage = (index, forEveryone = true) => {
    const message = messages[index];
    if (message) {
      socket.emit('deleteMessage', {
        recipientId: message.recipient,
        messageId: message._id,
      });

      setMessages((prevMessages) =>
        prevMessages.map((msg, idx) =>
          idx === index ? { ...msg, content: forEveryone ? 'Message deleted' : 'Message deleted for you' } : msg
        )
      );
      setShowOptions(null);
    }
  };

  const startEditingMessage = (index) => {
    const message = messages[index];
    setInput(message.content);
    setEditingMessageId(message._id);
    setShowOptions(null);
  };

  return (
    <div className="flex flex-col w-full bg-transparent p-4 rounded-lg shadow-lg h-full md:h-screen border border-gray-500">
      {/* Error Message Notification */}
      {errorMessage && (
        <div className="bg-gray-300 text-black text-center py-2 rounded mb-2 transition-opacity duration-500">
          Some error Occurred
        </div>
      )}

      {/* Chat User Profile */}
      <div className="flex items-center mb-4 space-x-2">
        <img src={chatUser.profilePicture} alt="" className="rounded-full h-12 w-12 md:h-16 md:w-16" />
        <div>
          <h2 className="text-lg font-semibold text-gray-100">{chatUser.username}</h2>
          {recipientId && (
            <p className="text-sm text-gray-500">Last seen at {formatLastSeen(lastSeen) || 'recently'}</p>
          )}
        </div>
      </div>

      {/* Messages List */}
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-100 scrollbar-track-gray-600 mb-4 p-2 border border-gray-500 rounded-md bg-transparent">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-center justify-between my-2 p-2 rounded-md relative 
              ${message.sender === recipientId 
                ? 'bg-gray-900 border border-zinc-700 text-gray-100 self-start' 
                : 'bg-green-900 border border-zinc-600 shadow-2xl text-white self-end'}`}
            style={{
              alignSelf: message.sender === recipientId ? 'flex-start' : 'flex-end',
              marginLeft: message.sender === recipientId ? '0' : 'auto',
              marginRight: message.sender !== recipientId ? '0' : 'auto',
              maxWidth: '50%' // Optionally limit the message width
            }}
          >
            <div>
              {message.content && <p className="mr-2">{message.content}</p>}
              {message.file && (
                message.type.startsWith('image/')
                  ? <img src={message.file} alt="Chat media" className="w-96 h-auto rounded-lg" />
                  : <a href={message.file} target="_blank" rel="noopener noreferrer" className="text-green-400 underline">Download File</a>
              )}
            </div>
            <div className="relative">
              {message.content !== 'Message deleted' && (
                <div>
                  {message.sender !== recipientId && (
                    <span className="text-xs">
                      {message.status === 'sent' ? '✓' : message.status === 'seen' ? '✓✓' : message.status === 'edited' ? 'edited' : <FontAwesomeIcon icon={faClock} className="text-yellow-500" />}
                    </span>
                  )}
                  <FontAwesomeIcon
                    icon={faEllipsisV}
                    className="cursor-pointer ml-2 hover:text-red-800"
                    onClick={() => toggleOptions(index)}
                  />
                </div>
              )}
              {showOptions === index && (
                <div className="absolute ml-4 mt-2 w-24 bg-gray-700 rounded shadow-lg z-10">
                  <button
                    onClick={() => deleteMessage(index, true)}
                    className="block w-full text-left px-2 py-1 hover:bg-red-600 rounded"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => startEditingMessage(index)}
                    className="block w-full text-left px-2 py-1 hover:bg-green-400 rounded"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input and Actions */}
      <div className="flex items-center bg-transparent border border-white rounded-lg" >
        <input
          type="text"
          placeholder="Type a message"
          className="flex-1 p-3 bg-transparent focus:outline-none text-gray-100"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <input
          type="file"
          id="fileInput"
          className="hidden"
          onChange={handleFileChange}
        />
        <label htmlFor="fileInput" className="text-gray-600 cursor-pointer mr-4">
          <FontAwesomeIcon icon={faPaperclip} />
        </label>
        <button onClick={handleSendMessage} className="bg-green-400 mr-2 p-1 rounded-full text-white">
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
