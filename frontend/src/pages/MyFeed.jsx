// src/pages/MyFeed.jsx
import React, { useState, useEffect, useContext } from "react";
import api from "../api/api"; // Axios instance for making API requests
import { AuthContext } from "../context/AuthContext";

const MyFeed = () => {
  const { user } = useContext(AuthContext); // Get the logged-in user
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyRecipes = async () => {
      try {
        const response = await api.get("/recipes/myrecipes", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }); // Fetch the user's specific recipes
        setRecipes(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user's recipes:", error);
        setLoading(false);
      }
    };

    fetchMyRecipes();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Recipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="bg-white shadow-md rounded-lg p-4 mb-4"
            >
              <h2 className="text-xl font-bold mb-2">{recipe.title}</h2>
              <p className="text-gray-600">
                <strong>Cuisine Type:</strong> {recipe.cuisineType}
              </p>
              <p className="text-gray-600">
                <strong>Cooking Time:</strong> {recipe.cookingTime} minutes
              </p>
              <p className="text-gray-600">
                <strong>Ingredients:</strong> {recipe.ingredients.join(", ")}
              </p>
              <p className="text-gray-600">
                <strong>Instructions:</strong> {recipe.instructions}
              </p>
            </div>
          ))
        ) : (
          <p>No recipes found in your feed.</p>
        )}
      </div>
    </div>
  );
};

export default MyFeed;
