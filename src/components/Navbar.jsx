import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4 text-white flex justify-between">
      <Link to="/" className="text-lg font-bold">EdTech Platform</Link>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/my-courses">My Courses</Link>
      </div>
    </nav>
  );
};

export default Navbar;
