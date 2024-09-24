import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api"; // Axios instance for API requests

const EditRecipe = () => {
  const { id } = useParams(); // Get recipe ID from the URL
  const [recipe, setRecipe] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    cuisineType: "",
    cookingTime: "",
  });
  const [image, setImage] = useState(null); // State for image file
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch the recipe details by ID
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await api.get(`/recipes/${id}`);
        setRecipe(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to load the recipe.");
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  // Handle form submission for updating the recipe
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", recipe.title);
      formData.append("ingredients", recipe.ingredients);
      formData.append("instructions", recipe.instructions);
      formData.append("cuisineType", recipe.cuisineType);
      formData.append("cookingTime", recipe.cookingTime);
      if (image) {
        formData.append("image", image); // Append image if a new image is selected
      }

      await api.put(`/recipes/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/myfeed"); // Redirect to MyFeed after successful update
    } catch (error) {
      setError("Failed to update the recipe.");
    }
  };

  // Handle input changes in the form
  const handleChange = (e) => {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image file changes
  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Store the selected image file
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Edit Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={recipe.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Ingredients
          </label>
          <input
            type="text"
            name="ingredients"
            value={recipe.ingredients}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Instructions
          </label>
          <textarea
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Cuisine Type
          </label>
          <input
            type="text"
            name="cuisineType"
            value={recipe.cuisineType}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Cooking Time (in minutes)
          </label>
          <input
            type="number"
            name="cookingTime"
            value={recipe.cookingTime}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Upload New Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange} // Handle image file change
            className="w-full border px-4 py-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update Recipe
        </button>
      </form>
    </div>
  );
};

export default EditRecipe;
