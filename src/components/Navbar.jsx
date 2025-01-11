import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [showSignOut, setShowSignOut] = useState(false);
  const handleSignOutClick = () => {
    setShowSignOut(!showSignOut);
  };
  const toggleDropdown = () => {
    setShowSignOut(!showSignOut); // Toggle dropdown visibility
  };
  return (
    <nav className="bg-blue-600 p-0 m-0 text-white flex justify-between">
      <Link to="/" className="text-lg font-bold"></Link>
      <div className="space-x-4 w-full">
        <header className="bg-blue-600 py-4 pr-0 flex justify-between items-center">
                {/* Left side - Logo */}
                <div className="text-white font-bold text-2xl">
                  EdTech
                </div>
        
                {/* Middle - Search Bar */}
                <div className="relative flex-1 mx-4">
                  <input
                    type="text"
                    placeholder="Search for videos, courses, etc."
                    className="w-500 p-2 pl-10 rounded-lg bg-white text-gray-800 border-2 border-blue-500 focus:outline-none"
                  />
        
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 16a7 7 0 1114 0 7 7 0 01-14 0zM11 11V6m0 5h5"
                  />
        
                </div>
        
                {/* Right side - Profile and Power Button */}
                <div className="flex items-center space-x-4">
                  {/* Profile Link */}
                  <Link to="/profile" className="text-white font-medium hover:text-blue-300">
                    My Profile
                  </Link>
        
                  {/* Power Button with Dropdown for Sign Out */}
                  <div className="relative">
                    <button
                      onClick={toggleDropdown} // Toggle dropdown visibility on click
                      className="text-white font-medium hover:text-blue-300"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
        
                    {showSignOut && (
                      <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md">
                        <button
                          className="w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-200"
                          onClick={handleSignOutClick} // Sign out when button is clicked
                        >
                          Sign Out
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </header>
      </div>
    </nav>
  );
};

export default Navbar;
