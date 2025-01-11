import React from 'react';

const VideoThumbnail = ({ video }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md text-center">
      <img src={video.thumbnail} alt={video.title} className="w-full h-40 object-cover" />
      <h3 className="mt-2 text-lg font-semibold">{video.title}</h3>
    </div>
  );
};

export default VideoThumbnail;
