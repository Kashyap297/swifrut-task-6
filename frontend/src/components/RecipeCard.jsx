// src/components/RecipeCard.jsx
import React from "react";

const RecipeCard = ({ recipe }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h2 className="text-xl font-bold mb-2">{recipe.title}</h2>
      <p className="text-gray-600">{recipe.description}</p>
      {/* Add more fields if needed */}
    </div>
  );
};

export default RecipeCard;
