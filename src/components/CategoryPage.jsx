// src/components/CategoryPage.jsx

import React from 'react';
import { useParams } from 'react-router-dom';

const CategoryPage = () => {
  const { categoryName } = useParams();

  return (
    <div>
      <h2 className="text-3xl font-semibold text-blue-600">Category: {categoryName}</h2>
      {/* Add logic to display courses or videos */}
    </div>
  );
};

export default CategoryPage;

