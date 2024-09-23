const Recipe = require("../models/recipeModel");

// Create Recipe
const createRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions, cuisineType, cookingTime } =
      req.body;
    const recipe = await Recipe.create({
      title,
      ingredients,
      instructions,
      cuisineType,
      cookingTime,
      author: req.user.id,
    });

    res.status(201).json(recipe);
  } catch (error) {
    res.status(400).json({ message: "Error creating recipe" });
  }
};

// Get All Recipes
const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving recipes" });
  }
};

// Get Recipe by ID
const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving recipe" });
  }
};

// Update Recipe
const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    if (recipe.author.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    const { title, ingredients, instructions, cuisineType, cookingTime } =
      req.body;
    recipe.title = title || recipe.title;
    recipe.ingredients = ingredients || recipe.ingredients;
    recipe.instructions = instructions || recipe.instructions;
    recipe.cuisineType = cuisineType || recipe.cuisineType;
    recipe.cookingTime = cookingTime || recipe.cookingTime;

    await recipe.save();
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Error updating recipe" });
  }
};

// Delete Recipe
const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    console.log("Author ID:", recipe.author.toString());
    console.log("Logged in user ID:", req.user.id);

    // Check if the user is authorized to delete the recipe
    if (recipe.author.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    // Use deleteOne() instead of remove()
    await Recipe.deleteOne({ _id: req.params.id });

    res.status(200).json({ message: "Recipe deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting recipe" });
  }
};
const getUserRecipes = async (req, res) => {
  try {
    // Find recipes created by the logged-in user
    const userRecipes = await Recipe.find({ author: req.user.id });

    if (!userRecipes.length) {
      return res
        .status(404)
        .json({ message: "No recipes found for this user" });
    }

    res.status(200).json(userRecipes);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user's recipes" });
  }
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  getUserRecipes,
};
