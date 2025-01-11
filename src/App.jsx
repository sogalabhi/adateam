// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import VideoPlayer from './components/VideoPlayer'; // Import the VideoPlayer component

const App = () => {
  return (
    
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/video/:videoId" element={<VideoPlayer />} /> {/* Video player page */}
      </Routes>
    
  );
};

export default App;



