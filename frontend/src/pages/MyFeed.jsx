// src/pages/MyFeed.jsx
import React, { useState, useEffect, useContext } from "react";
import api from "../api/api"; // Axios instance for making API requests
import { AuthContext } from "../context/AuthContext";

const MyFeed = () => {
  const { user } = useContext(AuthContext); // Get the logged-in user
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyFeed = async () => {
      try {
        const response = await api.get("/recipes/myfeed", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }); // Fetch the user's specific feed
        setRecipes(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching feed:", error);
        setLoading(false);
      }
    };

    fetchMyFeed();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Feed</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div key={recipe._id} className="bg-white shadow-md p-4 rounded">
              <h2 className="text-xl font-bold">{recipe.title}</h2>
              <p>{recipe.description}</p>
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
