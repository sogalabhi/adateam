// src/pages/ProfilePage.jsx

import React from 'react';

const ProfilePage = () => {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-blue-600">Your Profile</h2>
      
      {/* Profile Info */}
      <div className="mt-4 flex items-center">
        <img src="https://via.placeholder.com/150" alt="User Avatar" className="w-24 h-24 rounded-full border-2 border-blue-600" />
        <div className="ml-6">
          <h3 className="text-xl">John Doe</h3>
          <p className="text-gray-600">john.doe@example.com</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

