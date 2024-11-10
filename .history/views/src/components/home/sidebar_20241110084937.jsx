import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUser,
  faCog,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import './logo.css';

function Sidebar() {
  return (
    <div className="flex flex-col h-screen p-4 bg-zinc-800 text-gray-200 w-full">
      {/* Orbiting Balls Animation */}
      <div className="orbit-container">
        <div className="animate-orbit1 glow bg-red-400 rounded-full  w-6 h-6"></div>
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
          <span className="ml-3">Home</span>
        </li>
        <li className="flex items-center p-2 rounded-md hover:bg-gray-900 cursor-pointer">
          <FontAwesomeIcon icon={faUser} className="w-5 h-5" />
          <span className="ml-3">Profile</span>
        </li>
        <li className="flex items-center p-2 rounded-md hover:bg-gray-900 cursor-pointer">
          <FontAwesomeIcon icon={faCog} className="w-5 h-5" />
          <span className="ml-3">Settings</span>
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
