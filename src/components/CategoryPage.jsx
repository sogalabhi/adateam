import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from './Navbar';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const subCategories = {
    tech: ['ML', 'App', 'Web', 'Web3'],
    electronics: ['Circuits', 'Robotics', 'IoT'],
    jee: ['Physics', 'Math', 'Chemistry']
  };

  return (
    <div>
      <Navbar />
      <h1 className="text-2xl font-bold p-4">{categoryName.toUpperCase()}</h1>
      <div className="flex gap-4 p-4">
        {subCategories[categoryName]?.map(sub => (
          <Link key={sub} to={`/category/${categoryName}/${sub.toLowerCase()}`} className="bg-gray-200 p-4 rounded-lg">
            {sub}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
