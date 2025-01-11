import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import VideoThumbnail from '../components/VideoThumbnail';

const HomePage = () => {
  const categories = ['Tech', 'Electronics', 'JEE'];
  const videos = [
    { id: 1, title: 'Learn React', thumbnail: 'https://via.placeholder.com/150' },
    { id: 2, title: 'Python Basics', thumbnail: 'https://via.placeholder.com/150' }
  ];

  return (
    <div>
      <Navbar />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Categories</h1>
        <div className="flex gap-4">
          {categories.map(category => (
            <Link key={category} to={`/category/${category.toLowerCase()}`} className="bg-gray-200 p-4 rounded-lg">
              {category}
            </Link>
          ))}
        </div>

        <h1 className="text-2xl font-bold mt-8 mb-4">All Videos</h1>
        <div className="grid grid-cols-3 gap-4">
          {videos.map(video => (
            <VideoThumbnail key={video.id} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
