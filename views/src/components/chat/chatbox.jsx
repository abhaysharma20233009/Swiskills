import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faSmile,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import EmojiPicker from "emoji-picker-react";
import { ChevronDown } from "lucide-react";
import pic from "../../../public/chatsbanner.png";

const socket = io("https://swiskills.onrender.com", {
  withCredentials: true,
  path: "/socket.io",
});

const ChatBox = ({ chatUser }) => {
  const formatLastSeen = (date) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Kolkata",
      timeZoneName: "short",
    };
    return new Intl.DateTimeFormat("en-IN", options).format(new Date(date));
  };

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showOptions, setShowOptions] = useState(null);
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [lastSeen, setLastSeen] = useState(null);
  const messagesContainerRef = useRef(null);
  const recipientId = chatUser._id;

  useEffect(() => {
    const handleMouseMove = () => {
      socket.emit("markMessagesAsSeen", { recipientId });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [recipientId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showOptions !== null) {
        const menu = document.getElementById(`message-options-${showOptions}`);
        if (menu && !menu.contains(event.target)) {
          setShowOptions(null);
        }
      }

      if (showPicker) {
        const emojiPicker = document.getElementById("emoji-picker");
        const emojiButton = document.getElementById("emoji-button");
        if (
          !emojiPicker?.contains(event.target) &&
          !emojiButton?.contains(event.target)
        ) {
          setShowPicker(false);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showOptions, showPicker]);

  useEffect(() => {
    if (recipientId) {
      socket.emit("joinRoom", { recipientId });
    }

    socket.on("recipientLastSeen", (data) => setLastSeen(data.lastSeen));
    socket.on("conversationHistory", (msgs) => setMessages(msgs));
    socket.on("messageReceived", (msg) => setMessages((prev) => [...prev, msg]));

    socket.on("messageError", (error) => {
      if (error.message === "Unauthorized") {
        window.location.href = "/login";
      } else {
        setErrorMessage(error.message);
        setTimeout(() => setErrorMessage(null), 2000);
      }
    });

    socket.on("messageUpdate", (updated) =>
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === updated._id
            ? { ...msg, status: updated.status, content: updated.content }
            : msg
        )
      )
    );

    socket.on("isSeen", (updated) => setMessages(updated));

    socket.on("messageStatusUpdate", (updated) => {
      setMessages((prev) => {
        if (prev.length === 0) return prev;
        const updatedMessages = [...prev];
        updatedMessages[updatedMessages.length - 1] = updated;
        return updatedMessages;
      });
    });

    return () => {
      socket.off("recipientLastSeen");
      socket.off("conversationHistory");
      socket.off("messageReceived");
      socket.off("messageError");
      socket.off("messageUpdate");
      socket.off("isSeen");
      socket.off("messageStatusUpdate");
    };
  }, [recipientId]);

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    if (editingMessageId) {
      socket.emit("updateMessage", {
        recipientId,
        messageId: editingMessageId,
        content: input,
      });
      setEditingMessageId(null);
    } else {
      const messageData = {
        content: input,
        status: "pending",
      };
      displayMessage(messageData);
      socket.emit("sendMessage", { recipientId, content: input });
    }

    setInput("");
  };

  const displayMessage = (msg) => {
    setMessages((prev) => [...prev, msg]);
    scrollToBottom();
  };

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 100);
  }, [recipientId]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleOptions = (index) =>
    setShowOptions((prev) => (prev === index ? null : index));

  const deleteMessage = (index) => {
    const msg = messages[index];
    if (!msg) return;

    socket.emit("deleteMessage", {
      recipientId: msg.recipient,
      messageId: msg._id,
    });

    setMessages((prev) =>
      prev.map((m, idx) =>
        idx === index ? { ...m, content: "Message deleted" } : m
      )
    );
    setShowOptions(null);
  };

  const startEditingMessage = (index) => {
    const msg = messages[index];
    if (msg) {
      setInput(msg.content);
      setEditingMessageId(msg._id);
      setShowOptions(null);
    }
  };

  const addEmoji = (emojiObject) => {
    setInput((prev) => prev + emojiObject.emoji);
    setShowPicker(false);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-white">
      {errorMessage && (
        <div className="bg-gray-100 text-black text-center py-2">
          {errorMessage}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center px-4 py-3 border-b border-gray-300">
        <img
          src={chatUser.profilePicture || pic}
          alt=""
          className="rounded-full h-10 w-10 md:h-14 md:w-14 mr-4"
        />
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            {chatUser.username}
          </h2>
          <p className="text-xs text-gray-400">
            Last seen at {formatLastSeen(lastSeen) || "recently"}
          </p>
        </div>
      </div>

      {/* Scrollable Message Area */}
      <div
        ref={messagesContainerRef}
        className="flex-grow overflow-y-auto p-3 bg-gray-100"
      >
        {messages.map((message, index) => {
          const isSender = message.sender !== recipientId;
          const messageBg = isSender
            ? "bg-violet-500 text-white"
            : "bg-green-400 text-white";
          const floatAlign = isSender ? "float-right" : "float-left";
          return (
            <div
              key={index}
              className={`relative group my-1 py-2 px-3 rounded-lg clear-both break-words max-w-[60%] ${messageBg} ${floatAlign}`}
            >
              <div>{message.content}</div>

              {message.content !== "Message deleted" &&
                isSender && (
                  <span className="absolute bottom-1 right-2 text-xs">
                    {message.status === "sent" ? (
                      "✓"
                    ) : message.status === "seen" ? (
                      "✓✓"
                    ) : message.status === "edited" ? (
                      "edited"
                    ) : (
                      <FontAwesomeIcon icon={faClock} />
                    )}
                  </span>
                )}

              {message.content !== "Message deleted" && (
                <div
                  className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 cursor-pointer"
                  onClick={() => toggleOptions(index)}
                >
                  <ChevronDown className="w-5 h-5 text-white" />
                </div>
              )}

              {showOptions === index && (
                <div
                  id={`message-options-${index}`}
                  className="absolute top-6 right-1 mt-1 w-24 bg-white shadow-md z-50 text-gray-600"
                >
                  {isSender && (
                    <button
                      onClick={() => startEditingMessage(index)}
                      className="block w-full text-left px-2 py-1 hover:bg-gray-200"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => deleteMessage(index)}
                    className="block w-full text-left px-2 py-1 hover:bg-gray-200"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Input Field */}
      <div className="relative flex items-center p-3 border-t border-gray-300 bg-white">
        <button
          id="emoji-button"
          onClick={() => setShowPicker(!showPicker)}
          className="ml-2 mr-2"
        >
          <FontAwesomeIcon icon={faSmile} className="text-gray-500 text-xl" />
        </button>
        {showPicker && (
          <div
            id="emoji-picker"
            className="absolute bottom-12 left-0 z-50 bg-white shadow-md"
          >
            <EmojiPicker onEmojiClick={addEmoji} />
          </div>
        )}
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 p-3 text-gray-700 rounded-lg focus:outline-none border"
        />
        <button
          onClick={handleSendMessage}
          className="bg-green-400 text-white p-3 rounded-xl ml-3"
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
