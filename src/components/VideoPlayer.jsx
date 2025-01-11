// src/components/VideoPlayer.jsx

import React from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';

const VideoPlayer = () => {
  const { videoId } = useParams(); // Get the video ID from the URL
  
  // Sample video data (you can replace it with dynamic data later)
  const videoData = {
    '1': {
      title: 'React for Beginners',
      description: 'This video covers the fundamentals of React, including components, props, and state.',
      author: 'John Doe',
      videoUrl: 'https://bcgvspkuazvdtmzaqyiw.supabase.co/storage/v1/object/public/videos/1736610527993_video.mp4',
      summary: 'In this video, we will explore the basics of React. It includes an introduction to JSX, functional components, and how to manage state in React apps.',
    },
    '2': {
      title: 'Advanced JavaScript',
      description: 'Learn the advanced features of JavaScript like closures, async/await, and promises.',
      author: 'Jane Smith',
      videoUrl: 'https://bcgvspkuazvdtmzaqyiw.supabase.co/storage/v1/object/public/videos/1736610527993_video.mp4',
      summary: 'This video goes deep into JavaScript, covering advanced topics such as closures, async programming, and best practices for writing clean, efficient code.',
    },
    
  };

  const currentVideo = videoData[videoId];

  if (!currentVideo) {
    return <div className="text-center text-red-500">Video not found!</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left side - Video Player */}
      <div className="flex flex-col space-y-4">
        <div className="bg-black rounded-lg shadow-lg mb-4">
          <ReactPlayer
            url={currentVideo.videoUrl}
            controls={true}
            width="100%"
            height="auto"
          />
        </div>

        {/* Video Title and Description */}
        <div className="text-left">
          <h2 className="text-3xl font-semibold text-blue-600">{currentVideo.title}</h2>
          <p className="mt-2 text-lg text-gray-600">{currentVideo.description}</p>
          <p className="mt-4 text-md font-medium text-gray-800">By: {currentVideo.author}</p>
        </div>
      </div>

      {/* Right side - Video Summary */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold text-blue-600 mb-4">Video Summary</h3>
        <p className="text-lg text-gray-700">{currentVideo.summary}</p>
      </div>
    </div>
  );
};

export default VideoPlayer;
