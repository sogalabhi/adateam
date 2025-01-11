import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import MyCoursesPage from './pages/MyCoursesPage';
import CategoryPage from './components/CategoryPage';
import SubCategoryPage from './components/SubCategoryPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/my-courses" element={<MyCoursesPage />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/category/:categoryName/:subCategoryName" element={<SubCategoryPage />} />
      </Routes>
    </Router>
  );
};

export default App;


