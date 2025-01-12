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
import PaymentPage from './pages/PaymentPage';
import StudentsCoursesPage from './pages/StudentCourses';
import AuthorCoursesPage from './pages/authorpage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/video" element={<VideoPlayer />} /> {/* Video player page */}
      <Route path="/upload" element={<UploadToYoutube />} />
      <Route path="/onboarding" element={<Questionnaire />} />
      <Route path="/category/:categoryName" element={<CatergoriesPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/mycourses" element={<MyCoursesPage />} />
      <Route path="/studentcourses" element={<StudentsCoursesPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/author" element={<AuthorCoursesPage />} />
    </Routes>

  );
};

export default App;


