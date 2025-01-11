// src/pages/HomePage.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
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

  return (
    <div>
      <h2 className="text-3xl font-semibold text-blue-600 my-6">Welcome to EdTech</h2>
      
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
      <h3 className="text-2xl font-semibold text-blue-600 my-6">Trending Videos</h3>
      
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
