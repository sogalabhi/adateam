// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import VideoPlayer from './components/VideoPlayer'; // Import the VideoPlayer component
import Login from './pages/auth/loginpage';
import UploadToYoutube from './pages/UploadToYoutube';

const App = () => {
  return (
    
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/video" element={<VideoPlayer />} /> {/* Video player page */}
        <Route path="/login" element={<Login />} />
        <Route path="/upload" element={<UploadToYoutube />} />
        {/* <Route path="/profile" element={<ProfilePage />} />
        <Route path="/my-courses" element={<MyCoursesPage />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/category/:categoryName/:subCategoryName" element={<SubCategoryPage />} /> */}
      </Routes>
    
  );
};

export default App;



