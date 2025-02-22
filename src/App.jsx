// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Questionnaire from './components/Questionnaire';
import VideoPlayer from './components/VideoPlayer';
import Login from './pages/auth/loginpage';
import UploadToYoutube from './pages/UploadToYoutube';
import CatergoriesPage from './pages/CatergoriesPage';
import Register from './pages/auth/register';
import MyCoursesPage from './pages/MyCoursesPage';
import ProtectedRoute from './pages/auth/protectedroute'; // Import ProtectedRoute
import PaymentPage from './pages/PaymentPage';
import AuthorCoursesPage from './pages/authorpage';
import CreateCoursePage from './pages/CreateCoursePage';
import CourseViewPage from './pages/CourseViewPage';
import StudentsCoursesPage from './pages/StudentCourses';

const App = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected Routes */}
      <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      <Route path="/video" element={<ProtectedRoute><VideoPlayer /></ProtectedRoute>} />
      <Route path="/upload" element={<ProtectedRoute><UploadToYoutube /></ProtectedRoute>} />
      <Route path="/onboarding" element={<ProtectedRoute><Questionnaire /></ProtectedRoute>} />
      <Route path="/category/:categoryName" element={<ProtectedRoute><CatergoriesPage /></ProtectedRoute>} />
      <Route path="/mycourses" element={<ProtectedRoute><MyCoursesPage /></ProtectedRoute>} />
      <Route path="/boughtcourses" element={<StudentsCoursesPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/author" element={<AuthorCoursesPage />} />
      <Route path="/createcourse" element={<CreateCoursePage />} />
      <Route path="/viewcourse" element={<CourseViewPage/>} />
    </Routes>
  );
};

export default App;


