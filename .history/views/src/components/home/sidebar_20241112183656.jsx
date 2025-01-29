import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IoIosGitPullRequest } from "react-icons/io";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { VscGitPullRequestCreate } from "react-icons/vsc";
import { GoCodeReview } from "react-icons/go";
import {
  faHome,
  faUser,
  faCog,
  faSignOutAlt,
  faMessage
} from '@fortawesome/free-solid-svg-icons';
import { AiOutlineMenu } from 'react-icons/ai'; // Import hamburger icon
import './logo.css';
import { logout } from '../../api/login'; // Ensure this is correctly implemented

function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout(); // Ensure logout is awaited
    navigate('/'); // Navigate to login after logout
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      {/* Hamburger icon for mobile screens */}
      <div className="lg:hidden p-4">
        <AiOutlineMenu className="text-white text-3xl" onClick={toggleSidebar} />
      </div>

      {/* Sidebar */}
      <div className={`lg:flex ${isSidebarOpen ? 'block' : 'hidden'} flex-col h-screen p-4 bg-zinc-800 text-gray-200 w-full`}>
        {/* Orbiting Balls Animation */}
        <div className="orbit-container">
          <div className="animate-orbit1 glow bg-blue-400 rounded-full w-6 h-6"></div>
          <div className="animate-orbit2 glow bg-blue-100 rounded-full w-6 h-6"></div>
          <div className="animate-orbit3 glow bg-green-400 rounded-full w-6 h-6"></div>
        </div>

        {/* Brand Name */}
        <div className="ml-16">
          <a className="text-white font-extrabold text-2xl">SwiSkills</a>
        </div>

        {/* Sidebar Links */}
        <ul className="mt-4 space-y-4">
          <li className="flex items-center p-2 rounded-md hover:bg-gray-900 cursor-pointer" onClick={() => { navigate('/home'); toggleSidebar(); }}>
            <FontAwesomeIcon icon={faHome} className="w-5 h-5" />
            <span className="ml-3">Home</span>
          </li>
          <li className="flex items-center p-2 rounded-md hover:bg-gray-900 cursor-pointer" onClick={() => { navigate('/profile'); toggleSidebar(); }}>
            <FontAwesomeIcon icon={faUser} className="w-5 h-5" />
            <span className="ml-3">Profile</span>
          </li>
          <li className="flex items-center p-2 rounded-md hover:bg-gray-900 cursor-pointer" onClick={() => { navigate('/chats'); toggleSidebar(); }}>
            <FontAwesomeIcon icon={faMessage} className="w-5 h-5" />
            <span className="ml-3">Chats</span>
          </li>
          <li className="flex items-center p-2 rounded-md hover:bg-gray-900 cursor-pointer" onClick={() => { navigate('/accountSettings'); toggleSidebar(); }}>
            <FontAwesomeIcon icon={faCog} className="w-5 h-5" />
            <span className="ml-3">Account Settings</span>
          </li>
          <li className="flex items-center p-2 rounded-md hover:bg-gray-900 cursor-pointer" onClick={() => { navigate('/sentRequest'); toggleSidebar(); }}>
            <VscGitPullRequestCreate className="w-5 h-5" />
            <span className="ml-3">Request Sent</span>
          </li>
          <li className="flex items-center p-2 rounded-md hover:bg-gray-900 cursor-pointer" onClick={() => { navigate('/receivedRequest'); toggleSidebar(); }}>
            <VscGitPullRequestGoToChanges className="w-5 h-5" />
            <span className="ml-3">Request Received</span>
          </li>
          <li className="flex items-center p-2 rounded-md hover:bg-gray-900 cursor-pointer" onClick={() => { navigate('/receivedReview'); toggleSidebar(); }}>
            <GoCodeReview className="w-5 h-5" />
            <span className="ml-3">Review Received</span>
          </li>
          <li className="flex items-center p-2 rounded-md hover:bg-gray-900 cursor-pointer" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} className="w-5 h-5" />
            <span className="ml-3">Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
