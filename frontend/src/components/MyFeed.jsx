import React, { useState } from "react";

const MyFeed = () => {
  const [myRecipes] = useState([
    {
      id: 1,
      title: "My Special Pasta",
      description: "My personal favorite recipe",
    },
  ]);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">My Feed</h2>
      <ul>
        {myRecipes.map((recipe) => (
          <li key={recipe.id} className="border-b py-4">
            <h3 className="text-xl font-semibold">{recipe.title}</h3>
            <p>{recipe.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyFeed;
