import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import the js-cookie library
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars, faBell } from "@fortawesome/free-solid-svg-icons";

const Header = ({ toggleSidebar }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Effect to check if user is logged in based on cookie
  useEffect(() => {
    const token = Cookies.get("authToken"); // Check for an auth token cookie
    setIsLoggedIn(token); // Set login state based on presence of token
  }, []);

  // Function to handle login (this would be called after successful login)
  const handleLogin = () => {
    Cookies.set("authToken", "yourAuthToken", { expires: 7 }); // Set cookie for 7 days
    setIsLoggedIn(true); // Update the state
  };

  // Function to handle logout
  const handleLogout = () => {
    Cookies.remove("authToken"); // Remove the auth token cookie
    setIsLoggedIn(false); // Update the state
    navigate("/login"); // Redirect to login page
  };

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
        <div className="flex-grow sm:flex justify-center ml-2">
          <div className="flex items-center border border-white rounded-full px-1 py-1 md:px-6 h-8 md:h-10 w-full md:w-96">
            <input
              type="text"
              placeholder="Search here..."
              className="bg-transparent text-white placeholder-gray-400 w-full focus:outline-none"
            />
            <FontAwesomeIcon icon={faSearch} className="text-white ml-2" />
          </div>
        </div>

        {/* Notification */}
        <div className="">
          <FontAwesomeIcon icon={faBell} className="text-white mx-4" />
        </div>

        {/* Profile or Login/Signup */}
        <div className="flex items-center ml-auto">
          {isLoggedIn ? (
            <div className="flex items-center">
              <img
                src={''} // Replace with a user profile image URL
                alt="Profile"
                className="w-8 h-8 md:w-12 md:h-12 rounded-full"
              />
              <button
                className="ml-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm md:text-base"
                onClick={handleLogout} // Call logout function
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex space-x-2 md:space-x-4">
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm md:text-base"
                onClick={() => navigate('/signup')}
              >
                Signup
              </button>
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg text-sm md:text-base"
                onClick={() => navigate("/login")}
              >
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
