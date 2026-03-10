import { View, Text, TextInput, Pressable, StyleSheet, ScrollView } from "react-native";
import { useState } from "react";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";

// Ingredient type
type Ingredient = {
  name: string;
  amount: string;
  unit: string;
};

export default function AddRecipeScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  const [recipeName, setRecipeName] = useState<string>("");
  const [servings, setServings] = useState<string>("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: "", amount: "", unit: "" },
  ]);

  function updateIngredient(index: number, field: keyof Ingredient, value: string) {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = value;
    setIngredients(updatedIngredients);
  }

  function addIngredient() {
    setIngredients([...ingredients, { name: "", amount: "", unit: "" }]);
  }

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { backgroundColor: theme.background }]}
    >
      <Text style={[styles.title, { color: theme.text }]}>Add Recipe</Text>

      {/* Recipe Name */}
      <TextInput
        placeholder="Recipe Name"
        placeholderTextColor={theme.text + "99"}
        value={recipeName}
        onChangeText={setRecipeName}
        style={[styles.input, { color: theme.text, borderColor: theme.text + "66" }]}
      />

      {/* Servings */}
      <TextInput
        placeholder="Servings"
        placeholderTextColor={theme.text + "99"}
        value={servings}
        onChangeText={setServings}
        keyboardType="numeric"
        style={[styles.input, { color: theme.text, borderColor: theme.text + "66" }]}
      />

      <Text style={[styles.subtitle, { color: theme.text }]}>Ingredients</Text>

      {/* Ingredient List */}
      {ingredients.map((ingredient, index) => (
        <View key={index} style={styles.ingredientRow}>
          <TextInput
            placeholder="Name"
            placeholderTextColor={theme.text + "99"}
            value={ingredient.name}
            onChangeText={(text) => updateIngredient(index, "name", text)}
            style={[styles.ingredientInput, { color: theme.text, borderColor: theme.text + "66" }]}
          />
          <TextInput
            placeholder="Amount"
            placeholderTextColor={theme.text + "99"}
            value={ingredient.amount}
            keyboardType="numeric"
            onChangeText={(text) => updateIngredient(index, "amount", text)}
            style={[styles.ingredientInput, { color: theme.text, borderColor: theme.text + "66" }]}
          />
          <TextInput
            placeholder="Unit"
            placeholderTextColor={theme.text + "99"}
            value={ingredient.unit}
            onChangeText={(text) => updateIngredient(index, "unit", text)}
            style={[styles.ingredientInput, { color: theme.text, borderColor: theme.text + "66" }]}
          />
        </View>
      ))}

      {/* Add Ingredient Button */}
      <Pressable style={[styles.addButton, { backgroundColor: theme.tint }]} onPress={addIngredient}>
        <Text style={[styles.addButtonText, { color: theme.background }]}>+ Add Ingredient</Text>
      </Pressable>
    </ScrollView>
  );
}

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
    padding: 10,
    borderRadius: 8,
  },
  addButton: {
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  addButtonText: {
    fontWeight: "bold",
    textAlign: "center",
  },
});