// src/pages/HomePage.jsx
import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import api from "../api/api"; // Axios instance for API calls

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [filteredRecipes, setFilteredRecipes] = useState([]); // Filtered recipes state

  // Fetch all recipes when the component loads
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await api.get("/recipes"); // API to get all recipes
        setRecipes(response.data);
        setFilteredRecipes(response.data); // Initially set filtered recipes to all recipes
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);
console.log(recipes)
  // Handle search input changes
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    // Filter recipes based on the search term
    const filtered = recipes.filter(
      (recipe) =>
        recipe.cuisineType.toLowerCase().includes(value) ||
        recipe.ingredients.some((ingredient) =>
          ingredient.toLowerCase().includes(value)
        )
    );
    setFilteredRecipes(filtered);
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">All Recipes</h1>

      {/* Search bar for filtering */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by ingredients or cuisine type"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))
        ) : (
          <p>No recipes found</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
