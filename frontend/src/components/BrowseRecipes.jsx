import React, { useState } from "react";

const BrowseRecipes = () => {
  const [recipes] = useState([
    { id: 1, title: "Spaghetti Carbonara", description: "Italian dish" },
    { id: 2, title: "Chicken Tacos", description: "Mexican dish" },
  ]);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Browse All Recipes</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id} className="border-b py-4">
            <h3 className="text-xl font-semibold">{recipe.title}</h3>
            <p>{recipe.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BrowseRecipes;
