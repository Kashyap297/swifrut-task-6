const express = require("express");
const {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/recipeController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// Create a new recipe and get all recipes
router.post("/", protect, createRecipe);
router.get("/", getRecipes);

// Get, update, and delete a recipe by ID
router.get("/:id", getRecipeById);
router.put("/:id", protect, updateRecipe);
router.delete("/:id", protect, deleteRecipe);

module.exports = router;
