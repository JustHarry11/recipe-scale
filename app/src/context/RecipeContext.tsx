import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Types
export type Ingredient = {
  name: string;
  amount: string;
  unit: string;
};

export type Recipe = {
  id: string;
  name: string;
  servings: number;
  ingredients: Ingredient[];
};

// Context type
type RecipeContextType = {
  recipes: Recipe[];
  addRecipe: (recipe: Recipe) => void;
  deleteRecipe: (id: string) => void;
};

// Create context
const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

// Provider
export function RecipeProvider({ children }: { children: React.ReactNode }) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  // Load recipes on app start
  useEffect(() => {
    loadRecipes();
  }, []);

  // Save recipes whenever they change
  useEffect(() => {
    saveRecipes();
  }, [recipes]);

  // Load from AsyncStorage
  async function loadRecipes() {
    try {
      const storedRecipes = await AsyncStorage.getItem("recipes");

      if (storedRecipes) {
        setRecipes(JSON.parse(storedRecipes));
      }
    } catch (error) {
      console.log("Error loading recipes:", error);
    }
  }

  // Save to AsyncStorage
  async function saveRecipes() {
    try {
      await AsyncStorage.setItem("recipes", JSON.stringify(recipes));
    } catch (error) {
      console.log("Error saving recipes:", error);
    }
  }

  // Add recipe
  function addRecipe(recipe: Recipe) {
    setRecipes((prev) => [...prev, recipe]);
  }

  // Delete recipe (bonus feature)
  function deleteRecipe(id: string) {
    setRecipes((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <RecipeContext.Provider value={{ recipes, addRecipe, deleteRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
}

// Custom hook
export function useRecipes() {
  const context = useContext(RecipeContext);

  if (!context) {
    throw new Error("useRecipes must be used within a RecipeProvider");
  }

  return context;
}