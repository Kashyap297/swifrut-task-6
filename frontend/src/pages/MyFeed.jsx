import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";

const MyFeed = () => {
  const { user } = useContext(AuthContext);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyRecipes = async () => {
      try {
        const response = await api.get("/recipes/myrecipes", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setRecipes(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user's recipes:", error);
        setLoading(false);
      }
    };

    fetchMyRecipes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/recipes/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setRecipes(recipes.filter((recipe) => recipe._id !== id)); // Remove the deleted recipe from UI
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-recipe/${id}`); // Redirect to edit page
  };

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

              {/* Edit and Delete Buttons */}
              <div className="mt-4">
                <button
                  onClick={() => handleEdit(recipe._id)}
                  className="bg-yellow-500 text-white px-4 py-2 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(recipe._id)}
                  className="bg-red-500 text-white px-4 py-2"
                >
                  Delete
                </button>
              </div>
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
