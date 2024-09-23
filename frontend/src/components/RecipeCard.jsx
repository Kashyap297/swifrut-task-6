// src/components/RecipeCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  return (
    <Link to={`/recipes/${recipe._id}`}>
      <div className="bg-white shadow-md rounded-lg p-4 mb-4 cursor-pointer hover:bg-gray-100">
        <h2 className="text-xl font-bold mb-2">{recipe.title}</h2>
        <p className="text-gray-600">{recipe.description}</p>
      </div>
    </Link>
  );
};

export default RecipeCard;
