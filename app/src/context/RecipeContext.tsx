import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Ingredient = { name: string; amount: string; unit: string };
export type Recipe = { id: string; name: string; servings: number; ingredients: Ingredient[] };

type RecipeContextType = {
  recipes: Recipe[];
  addRecipe: (recipe: Recipe) => void;
  deleteRecipe: (id: string) => void;
};

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export function RecipeProvider({ children }: { children: React.ReactNode }) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load once on mount
  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem("recipes");
        if (stored) setRecipes(JSON.parse(stored));
      } catch (e) {
        console.log("Error loading recipes:", e);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  // Save whenever recipes change, after initial load
  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem("recipes", JSON.stringify(recipes)).catch((e) =>
      console.log("Error saving recipes:", e)
    );
  }, [recipes, loaded]);

  const addRecipe = (recipe: Recipe) => {
    setRecipes((prev) => [...prev, recipe]);
  };

  const deleteRecipe = (id: string) => {
    setRecipes((prev) => prev.filter((r) => r.id !== id));
  };

  return <RecipeContext.Provider value={{ recipes, addRecipe, deleteRecipe }}>{children}</RecipeContext.Provider>;
}

export function useRecipes() {
  const context = useContext(RecipeContext);
  if (!context) throw new Error("useRecipes must be used within a RecipeProvider");
  return context;
}