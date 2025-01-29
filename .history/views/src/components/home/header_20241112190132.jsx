import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import the js-cookie library
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars, faBell } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
const Header = ({ toggleSidebar }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [profilePicture,setProfilePicture]=useState('');

  // Effect to check if user is logged in based on cookie
  useEffect(() => {
    const token = Cookies.get("jwt"); // Check for an auth token cookie
    setIsLoggedIn(token); // Set login state based on presence of token
  }, []);
   
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios('/api/v1/users/me');
        
        setProfilePicture(response.data.data.data.profilePicture);
    
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);
  return (
    <div className="flex items-center h-16 bg-zinc-800 p-4 shadow-md">
      {/* Sidebar Toggle Button (Mobile Only) */}
      <button onClick={toggleSidebar} className="text-white mr-4 md:hidden">
        <FontAwesomeIcon icon={faBars} size="lg" />
      </button>
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


      <div className="flex items-center justify-between w-full mx-auto">
        

       
      
        {/* Notification */}
        <div className="">
          <FontAwesomeIcon icon={faBell} className="text-white mx-4" />
        </div>

        {/* Profile or Login/Signup */}
        <div className="flex items-center ml-auto">
          <img src={profilePicture} alt="" />
         
        </div>
      </div>
    </div>
  );
};

export default Header;
