import { View, Text, TextInput, Pressable, StyleSheet, ScrollView } from "react-native";
import { useState } from "react";

// 1️⃣ Define the Ingredient type
type Ingredient = {
  name: string;
  amount: string;
  unit: string;
};

export default function AddRecipeScreen() {
  // 2️⃣ State for recipe name, servings, and ingredient list
  const [recipeName, setRecipeName] = useState<string>("");
  const [servings, setServings] = useState<string>("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: "", amount: "", unit: "" },
  ]);

  // 3️⃣ Update a single ingredient
  function updateIngredient(index: number, field: keyof Ingredient, value: string) {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = value;
    setIngredients(updatedIngredients);
  }

  // 4️⃣ Add a new ingredient row
  function addIngredient() {
    setIngredients([...ingredients, { name: "", amount: "", unit: "" }]);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Recipe</Text>

      {/* Recipe name input */}
      <TextInput
        placeholder="Recipe Name"
        value={recipeName}
        onChangeText={setRecipeName}
        style={styles.input}
      />

      {/* Servings input */}
      <TextInput
        placeholder="Servings"
        value={servings}
        onChangeText={setServings}
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.subtitle}>Ingredients</Text>

      {/* Render ingredient inputs */}
      {ingredients.map((ingredient, index) => (
        <View key={index} style={styles.ingredientRow}>
          <TextInput
            placeholder="Name"
            value={ingredient.name}
            onChangeText={(text) => updateIngredient(index, "name", text)}
            style={styles.ingredientInput}
          />
          <TextInput
            placeholder="Amount"
            value={ingredient.amount}
            keyboardType="numeric"
            onChangeText={(text) => updateIngredient(index, "amount", text)}
            style={styles.ingredientInput}
          />
          <TextInput
            placeholder="Unit"
            value={ingredient.unit}
            onChangeText={(text) => updateIngredient(index, "unit", text)}
            style={styles.ingredientInput}
          />
        </View>
      ))}

      {/* Add ingredient button */}
      <Pressable style={styles.addButton} onPress={addIngredient}>
        <Text style={styles.addButtonText}>+ Add Ingredient</Text>
      </Pressable>
    </ScrollView>
  );
}

// 5️⃣ Styles
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
  },
  ingredientRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 10,
  },
  ingredientInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
  },
  addButton: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  addButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});