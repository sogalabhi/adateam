import React from 'react';
import Login from './pages/auth/loginpage';
import Register from './pages/auth/register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Correct import for Router
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import MyCoursesPage from './pages/MyCoursesPage';
import CategoryPage from './components/CategoryPage';
import SubCategoryPage from './components/SubCategoryPage';

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Login/>} />
      </Routes>
    
  );
};

export default App;



