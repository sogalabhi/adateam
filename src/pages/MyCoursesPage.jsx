// src/pages/MyCoursesPage.jsx

import React from 'react';

const MyCoursesPage = () => {
  const courses = [
    { id: 1, title: 'React for Beginners' },
    { id: 2, title: 'Advanced JavaScript' },
    { id: 3, title: 'Finance 101' },
  ];

  return (
    <div>
      <h2 className="text-3xl font-semibold text-blue-600  mb-4">My Courses</h2>
      <div className="space-y-4">
        {courses.map((course) => (
          <div key={course.id} className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">{course.title}</h3>
            <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Start Course</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCoursesPage;
