import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';


const VideoPlayer = () => {
  const location = useLocation();
  const { lesson } = location.state || {};

  if (!lesson) {
    return <div className="text-center text-red-500 text-2xl font-bold mt-20">Video not found!</div>;
  }

  return (
    <div className="m-0 bg-gray-100">
      {/* Header Section */}
      <div className="bg-blue-600 text-white py-4 px-6 flex items-center justify-between shadow-lg">
        
        <h1 className="text-3xl font-bold">EdTech</h1>
      </div>

      {/* Main Content Section */}
      <div className="max-w-7xl mx-auto m-0 p-6 grid grid-cols-1 md:grid-cols-2 gap-20 mt-8">
        {/* Left Side - Video Player and Details */}
        <div className="space-y-6">
          {/* Video Player */}
          <div className="rounded-lg  overflow-hidden shadow-xl border-2 border-blue-600">
            <ReactPlayer
              url={lesson.content_url}
              controls
              width="100%"
              height="auto"
            />
          </div>

          {/* Video Title and Description */}
          <div className="p-4 bg-white shadow-lg rounded-lg border border-gray-200">
            <h2 className="text-4xl  font-bold text-blue-600">{lesson.title}</h2>
            <p className="mt-4 text-lg text-gray-700">{lesson.description}</p>
            <p className="mt-4 text-md font-semibold text-gray-900">By: {lesson.author || 'Unknown'}</p>
          </div>
        </div>

        {/* Right Side - Video Summary */}
        <div className="p-8 bg-white shadow-xl rounded-lg border border-gray-200">
          <h3 className="text-3xl font-semibold text-blue-600 mb-6">Video Summary</h3>
          <p className="text-lg text-gray-700 leading-relaxed">{lesson.summary || 'No summary available for this video.'}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;



