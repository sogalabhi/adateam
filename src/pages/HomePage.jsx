// src/pages/HomePage.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [showSignOut, setShowSignOut] = useState(false);
  const categories = ['Tech', 'Finance', 'Electronics', 'Marketing'];

  // Sample video data
  const videos = [
    { id: 1, title: 'React for Beginners', thumbnail: 'https://via.placeholder.com/300x200' },
    { id: 2, title: 'Advanced JavaScript', thumbnail: 'https://via.placeholder.com/300x200' },
    { id: 3, title: 'HTML & CSS Basics', thumbnail: 'https://via.placeholder.com/300x200' },
    { id: 4, title: 'Learn Python', thumbnail: 'https://via.placeholder.com/300x200' },
    { id: 5, title: 'Introduction to React Native', thumbnail: 'https://via.placeholder.com/300x200' },
    // Add more videos here...
  ];

  const handleSignOutClick = () => {
    setShowSignOut(!showSignOut);
  };

  return (
    <div>
      {/* Header */}
      <header className="bg-blue-600 p-4 flex justify-between items-center">
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
              onClick={handleSignOutClick}
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {showSignOut && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md">
                <button
                  className="w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-200"
                  onClick={() => alert('Signed out!')}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div>
        <h2 className="text-3xl font-semibold text-blue-600 my-6">Welcome to EdTech</h2>
      </div>
      
      {/* Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {categories.map((category) => (
          <Link 
            to={`/category/${category}`}
            key={category}
            className="bg-black text-white p-6 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
          >
            <h3 className="text-xl">{category}</h3>
          </Link>
        ))}
      </div>

      {/* Video Thumbnails Section */}
      <div>
        <h3 className="text-2xl font-semibold text-blue-600 my-6">Latest Videos</h3>
      </div>
      {/* Video Thumbnails Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {videos.map((video) => (
          <Link
            key={video.id}
            to={`/video/${video.id}`} // Link to the video player page
            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300"
          >
            <img
              className="w-full h-48 object-cover rounded-t-lg"
              src={video.thumbnail}
              alt={video.title}
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-blue-600">{video.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

