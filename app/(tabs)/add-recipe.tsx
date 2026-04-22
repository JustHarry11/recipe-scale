// app/add-recipe.tsx
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView } from "react-native";
import { useState } from "react";
import { useRecipes } from "../src/context/RecipeContext";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";

type Ingredient = { name: string; amount: string; unit: string };

export default function AddRecipeScreen() {
  const { addRecipe } = useRecipes();
  const router = useRouter();

  const theme = Colors.light;

  const [recipeName, setRecipeName] = useState("");
  const [servings, setServings] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([{ name: "", amount: "", unit: "" }]);

  function updateIngredient(index: number, field: keyof Ingredient, value: string) {
    const updated = [...ingredients];
    updated[index][field] = value;
    setIngredients(updated);
  }

  function addIngredient() {
    setIngredients([...ingredients, { name: "", amount: "", unit: "" }]);
  }

  function saveRecipe() {
    // 1️⃣ Validation
    if (!recipeName.trim() || !servings.trim()) {
      alert("Please fill in all fields");
      return;
    }

    // Optional: check that ingredients are filled
    const emptyIngredient = ingredients.some(
      (i) => !i.name.trim() || !i.amount.trim()
    );
    if (emptyIngredient) {
      alert("Please fill in all ingredient fields");
      return;
    }
    const newRecipe = {
      id: Date.now().toString(),
      name: recipeName,
      servings: Number(servings),
      ingredients,
    };
    addRecipe(newRecipe);
    // 4️⃣ Reset the form
    setRecipeName("");
    setServings("");
    setIngredients([{ name: "", amount: "", unit: "" }]);
    router.push("/");
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView contentContainerStyle={[styles.container,{ flexGrow: 1 }]}>
        <Text style={[styles.title, { color: theme.text }]}>Add Recipe</Text>

        <TextInput
          placeholder="Recipe Name"
          placeholderTextColor={theme.text + "99"}
          value={recipeName}
          onChangeText={setRecipeName}
          style={[styles.input, { color: theme.text, borderColor: theme.text + "66" }]}
        />

        <TextInput
          placeholder="Servings"
          placeholderTextColor={theme.text + "99"}
          value={servings}
          onChangeText={setServings}
          keyboardType="numeric"
          style={[styles.input, { color: theme.text, borderColor: theme.text + "66" }]}
        />

        <Text style={[styles.subtitle, { color: theme.text }]}>Ingredients</Text>
        {ingredients.map((ing, idx) => (
          <View key={idx} style={styles.ingredientRow}>
            <TextInput
              placeholder="Name"
              placeholderTextColor={theme.text + "99"}
              value={ing.name}
              onChangeText={(v) => updateIngredient(idx, "name", v)}
              style={[styles.ingredientInput, { color: theme.text, borderColor: theme.text + "66" }]}
            />
            <TextInput
              placeholder="Amount"
              placeholderTextColor={theme.text + "99"}
              value={ing.amount}
              keyboardType="numeric"
              onChangeText={(v) => updateIngredient(idx, "amount", v)}
              style={[styles.ingredientInput, { color: theme.text, borderColor: theme.text + "66" }]}
            />
            <TextInput
              placeholder="Unit"
              placeholderTextColor={theme.text + "99"}
              value={ing.unit}
              onChangeText={(v) => updateIngredient(idx, "unit", v)}
              style={[styles.ingredientInput, { color: theme.text, borderColor: theme.text + "66" }]}
            />
          </View>
        ))}

        <Pressable style={[styles.addButton, { backgroundColor: theme.tint }]} onPress={addIngredient}>
          <Text style={[styles.addButtonText, { color: theme.background }]}>+ Add Ingredient</Text>
        </Pressable>

        <Pressable style={[styles.addButton, { backgroundColor: theme.tint }]} onPress={saveRecipe}>
          <Text style={[styles.addButtonText, { color: theme.background }]}>Save Recipe</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, padding: 12, marginBottom: 12, borderRadius: 8 },
  subtitle: { fontSize: 18, fontWeight: "600", marginTop: 20, marginBottom: 10, textAlign: "center" },
  ingredientRow: { flexDirection: "row", gap: 8, marginBottom: 10 },
  ingredientInput: { flex: 1, borderWidth: 1, padding: 10, borderRadius: 8 },
  addButton: { padding: 12, borderRadius: 8, marginTop: 10 },
  addButtonText: { fontWeight: "bold", textAlign: "center" },
});