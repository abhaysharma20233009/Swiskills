

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import Dp from "../../assets/rcbg.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars ,faBell} from "@fortawesome/free-solid-svg-icons";


const Header = ({ toggleSidebar }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <div className="flex items-center h-16 bg-zinc-800 p-4 shadow-md">
      {/* Sidebar Toggle Button (Mobile Only) */}
      <button onClick={toggleSidebar} className="text-white mr-4 md:hidden">
        <FontAwesomeIcon icon={faBars} size="lg" />
      </button>

      <div className="flex items-center justify-between w-full mx-auto">
        {/* Brand Name */}
        <div className="text-white font-extrabold text-xl md:text-2xl md:hidden">
          SwiSkills
        </div>

        {/* Centered Search Bar */}
        <div className="flex-grow  sm:flex justify-center ml-2">
          <div className="flex items-center  border border-white rounded-full px-1 py-1 md:px-6 h-8 md:h-10 w-full md:w-96">
            <input
              type="text"
              placeholder="Search here..."
              className="bg-transparent text-white placeholder-gray-400 w-full focus:outline-none "
            />
            <FontAwesomeIcon icon={faSearch} className="text-white ml-2" />
          </div>
        </div>

        {/*notificstion */}
        <div className="">
          <FontAwesomeIcon icon={faBell} className="text-white mx-4" />
        </div>

        {/* Profile or Login/Signup */}
        <div className="flex items-center ml-auto">
          {isLoggedIn ? (
            <img
              src={''}
              alt="Profile"
              className="w-8 h-8 md:w-12 md:h-12 rounded-full"
            />
          ) : (
            <div className="flex space-x-2 md:space-x-4">
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm md:text-base"
                onClick={() => navigate('/signup')}
              >
                Signup
              </button>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg text-sm md:text-base" onClick={() => navigate("/login")}>
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
