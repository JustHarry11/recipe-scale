import { View, Text, StyleSheet, TextInput, Pressable, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { useRecipes } from "../src/context/RecipeContext";

import { Colors } from "@/constants/theme";

export default function RecipeScreen() {
  const { id } = useLocalSearchParams();
  const { recipes } = useRecipes();

  const theme = Colors.light;

  const recipe = recipes.find((r) => r.id === String(id));

  // ✅ Scaling state with safe default
  const [servings, setServings] = useState(1);

  useEffect(() => {
    if (recipe) {
      setServings(recipe.servings);
    }
  }, [recipe]);

  if (!recipe) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.title, { color: theme.text }]}>Recipe not found</Text>
      </View>
    );
  }

  // Scale ingredient amounts
  const scaleAmount = (amount: number) =>
    Math.round((amount * servings) / recipe.servings * 100) / 100;

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>{recipe.name}</Text>

      {/* Servings input with increment/decrement */}
      <Text style={[styles.subtitle, { color: theme.text }]}>Servings</Text>

      <View style={styles.servingsRow}>
        <Pressable
          style={[styles.servingsButton, { backgroundColor: theme.tint }]}
          onPress={() => setServings(Math.max(1, servings - 1))}
        >
          <Text style={[styles.servingsButtonText, { color: theme.background }]}>−</Text>
        </Pressable>

        <TextInput
          value={String(servings)}
          keyboardType="numeric"
          onChangeText={(value) => {
            const parsed = Number(value);
            if (!isNaN(parsed) && parsed > 0) setServings(parsed);
          }}
          style={[
            styles.servingsInput,
            {
              color: theme.text,
              borderColor: theme.text + "66",
            },
          ]}
          placeholderTextColor={theme.text + "88"}
        />

        <Pressable
          style={[styles.servingsButton, { backgroundColor: theme.tint }]}
          onPress={() => setServings(servings + 1)}
        >
          <Text style={[styles.servingsButtonText, { color: theme.background }]}>+</Text>
        </Pressable>
      </View>

      {/* Ingredient list */}
      <Text style={[styles.subtitle, { color: theme.text }]}>Ingredients</Text>

      {recipe.ingredients.map((ingredient, index) => {
        if (!ingredient.name) return null;

        const amount = Number(ingredient.amount) || 0;
        const scaledAmount = scaleAmount(amount);

        return (
          <View key={index} style={styles.row}>
            <Text style={[styles.ingredientText, { color: theme.text }]}>
              {ingredient.name} — {scaledAmount} {ingredient.unit}
            </Text>

            <Text
              style={[
                styles.originalAmountText,
                { color: theme.text + "88" },
              ]}
            >
              ({amount} {ingredient.unit} for {recipe.servings} servings)
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },

  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },

  subtitle: { fontSize: 18, fontWeight: "600", marginTop: 20, marginBottom: 10 },

  servingsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },

  servingsButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },

  servingsButtonText: {
    fontSize: 24,
    fontWeight: "bold",
  },

  servingsInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    width: 60,
    textAlign: "center",
  },

  row: { marginTop: 12 },

  ingredientText: { fontSize: 16 },

  originalAmountText: { fontSize: 12 },
});