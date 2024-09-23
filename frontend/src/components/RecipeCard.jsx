import React from "react";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  return (
    <Link to={`/recipes/${recipe._id}`}>
      <div className="bg-white shadow-md rounded-lg p-4 mb-4 cursor-pointer hover:bg-gray-100 relative">
        <h2 className="text-xl font-bold mb-2">{recipe.title}</h2>
        <p className="text-gray-600 mb-4">{recipe.instructions}</p>

        {/* "Get more details" link aligned to the bottom-right corner */}
        <div className="absolute bottom-2 right-2">
          <span className="text-blue-500 hover:underline">
            Click to Know More
          </span>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
