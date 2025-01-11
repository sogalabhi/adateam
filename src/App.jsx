// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Questionnaire from './components/Questionnaire';
import VideoPlayer from './components/VideoPlayer'; // Import the VideoPlayer component
import Login from './pages/auth/loginpage';
import UploadToYoutube from './pages/UploadToYoutube';
import CatergoriesPage from './pages/CatergoriesPage';
import Register from './pages/auth/register';
import MyCoursesPage from './pages/MyCoursesPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/video" element={<VideoPlayer />} /> {/* Video player page */}
      <Route path="/login" element={<Login />} />
      <Route path="/upload" element={<UploadToYoutube />} />
      <Route path="/onboarding" element={<Questionnaire />} />
      <Route path="/category/:categoryName" element={<CatergoriesPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/mycourses" element={<MyCoursesPage />} />
    </Routes>

  );
};

export default App;


