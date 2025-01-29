import React from 'react';
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
  faSignOutAlt,faMessage
} from '@fortawesome/free-solid-svg-icons';
import './logo.css';

function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-screen p-4 bg-zinc-800 text-gray-200 w-full">
      {/* Orbiting Balls Animation */}
      <div className="orbit-container">
        <div className="animate-orbit1 glow bg-blue-400 rounded-full  w-6 h-6"></div>
        <div className="animate-orbit2 glow bg-blue-100 rounded-full  w-6 h-6"></div>
        <div className="animate-orbit3 glow bg-green-400 rounded-full w-6 h-6"></div>
      </div>

      {/* Brand Name */}
      <div className="ml-16">
        <a className="text-white font-extrabold text-2xl">SwiSkills</a>
       
      </div>
      <ul className="mt-4 space-y-4">
        <li className="flex items-center p-2 rounded-md hover:bg-gray-900 cursor-pointer">
          <FontAwesomeIcon icon={faHome} className="w-5 h-5" />
          <span className="ml-3" onClick={() => navigate('/home')}>Home</span>
        </li>
       
        <li className="flex items-center p-2 rounded-md hover:bg-gray-900 cursor-pointer">
          <FontAwesomeIcon icon={faUser} className="w-5 h-5" />
          <span className="ml-3" onClick={() => navigate('/profile')}>Profile</span>
        </li>
        <li className="flex items-center p-2 rounded-md hover:bg-gray-900 cursor-pointer">
          <FontAwesomeIcon icon={faMessage} className="w-5 h-5" />
          <span className="ml-3"  onClick={() => navigate('/chats')}>Chats</span>
        </li>
       
        <li className="flex items-center p-2 rounded-md hover:bg-gray-900 cursor-pointer">
          <FontAwesomeIcon icon={faCog} className="w-5 h-5" />
          <span className="ml-3" onClick={() => navigate('/accountSettings')}>Account Settings</span>
        </li>
        <li className="flex items-center p-2 rounded-md hover:bg-gray-900 cursor-pointer">
          <FontAwesomeIcon icon={faCog} className="w-5 h-5" />
          <span className="ml-3" onClick={() => navigate('/sentRequest')}>request sent</span>
        </li>
        <li className="flex items-center p-2 rounded-md hover:bg-gray-900 cursor-pointer">
          <VscGitPullRequestGoToChanges icon={faCog} className="w-5 h-5" />
          <span className="ml-3" onClick={() => navigate('/receivedRequest')}>request received</span>
        </li>
        <li className="flex items-center p-2 rounded-md hover:bg-gray-900 cursor-pointer">
          <GoCodeReview icon={faCog} className="w-5 h-5" />
          <span className="ml-3" onClick={() => navigate('/receivedReview')}>review received</span>
        </li>
        <li className="flex items-center p-2 rounded-md hover:bg-gray-900 cursor-pointer">
          < IoIosGitPullRequest icon={faCog} className="w-5 h-5" />
          <span className="ml-3" onClick={() => navigate('/sendRequest')}>send request</span>
        </li>
        <li className="flex items-center p-2 rounded-md hover:bg-gray-900 cursor-pointer">
          <FontAwesomeIcon icon={faSignOutAlt} className="w-5 h-5" />
          <span className="ml-3">Logout</span>
        </li>
        
      </ul>
    </div>
  );
}

export default Sidebar;
