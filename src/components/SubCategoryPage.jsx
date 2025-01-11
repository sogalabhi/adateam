import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import VideoThumbnail from './VideoThumbnail';

const SubCategoryPage = () => {
  const { subCategoryName } = useParams();
  const videos = [
    { id: 1, title: `${subCategoryName} Basics`, thumbnail: 'https://via.placeholder.com/150' },
    { id: 2, title: `${subCategoryName} Advanced`, thumbnail: 'https://via.placeholder.com/150' }
  ];

  return (
    <div>
      <Navbar />
      <h1 className="text-2xl font-bold p-4">{subCategoryName.toUpperCase()} Videos</h1>
      <div className="grid grid-cols-3 gap-4 p-4">
        {videos.map(video => (
          <VideoThumbnail key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default SubCategoryPage;
