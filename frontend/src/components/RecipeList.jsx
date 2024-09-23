// src/components/RecipeList.jsx
import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import api from "../api/api"; // Axios instance for API calls

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await api.get("/recipes"); // Assuming your endpoint is /recipes
        setRecipes(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recipes", error);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="mt-8 space-y-4">
      {recipes.length > 0 ? (
        recipes.map((recipe) => <RecipeCard key={recipe._id} recipe={recipe} />)
      ) : (
        <p className="text-white">No recipes found</p>
      )}
    </div>
  );
};

export default RecipeList;
