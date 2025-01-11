// src/components/SubCategoryPage.jsx

import React from 'react';
import { useParams } from 'react-router-dom';

const SubCategoryPage = () => {
  const { categoryName, subCategoryName } = useParams();

  return (
    <div>
      <h2 className="text-3xl font-semibold text-blue-600">SubCategory: {subCategoryName} under {categoryName}</h2>
      {/* Add logic to display related content */}
    </div>
  );
};

export default SubCategoryPage;

