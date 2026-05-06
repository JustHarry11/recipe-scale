import { View, Text, StyleSheet, TextInput, Pressable, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { useRecipes } from "../src/context/RecipeContext";
import { Ingredient } from "../src/types/recipe";
import { Colors } from "@/constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RecipeScreen() {
  const { id, recipe: recipeParam } = useLocalSearchParams();
  const { recipes, loaded } = useRecipes();

  const theme = Colors.light;
  const parsedRecipe = recipeParam
    ? JSON.parse(recipeParam as string)
    : null;

  const recipeFromContext = recipes.find(
    (r) => String(r.id) === String(id)
  );

  const recipe = recipeFromContext || parsedRecipe;

  const router = useRouter();

  // ✅ Scaling state with safe default
  const [servings, setServings] = useState<number | null>(null);



  useEffect(() => {
    if (recipe && servings === null) {
      setServings(recipe.servings);
    }
  }, [recipe, servings]);

  if (!recipe && !loaded) {
    return (
      <View style={styles.container}>
        <Text>Loading recipe...</Text>
      </View>
    );
  }

  if (!recipe && loaded) {
    return (
      <View style={styles.container}>
        <Text>Recipe not found</Text>
      </View>
    );
  }

  if (!recipe) return null;

  if (servings === null) return null;

  // Scale ingredient amounts
  const scaleAmount = (amount: number) => {
    if (!recipe) return 0;
    return Math.round((amount * servings) / recipe.servings * 100) / 100;
  };

  return (
    <>
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <Stack.Screen options={{ headerShown: false }} />
        <Text style={[styles.title, { color: theme.text }]}>
          {recipe.name}
        </Text>

        <View style={{ flex: 1 }}>

          {/* HEADER */}
          <View style={styles.header}>
            <Pressable onPress={() => router.back()}>
              <Text style={{ fontSize: 30, color: theme.text }}>←</Text>
            </Pressable>
          </View>

          {/* SCROLL CONTENT */}
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.contentWrapper}>



              <Text style={[styles.subtitle, { color: theme.text }]}>
                Servings
              </Text>

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
                />

                <Pressable
                  style={[styles.servingsButton, { backgroundColor: theme.tint }]}
                  onPress={() => setServings(servings + 1)}
                >
                  <Text style={[styles.servingsButtonText, { color: theme.background }]}>+</Text>
                </Pressable>
              </View>

              <Text style={[styles.subtitle, { color: theme.text }]}>
                Ingredients
              </Text>

              {recipe.ingredients.map((ingredient: Ingredient, index: number) => {
                if (!ingredient.name) return null;

                const amount = Number(ingredient.amount) || 0;
                const scaledAmount = scaleAmount(amount);

                return (
                  <View key={index} style={styles.row}>
                    <Text style={[styles.ingredientText, { color: theme.text }]}>
                      {ingredient.name} — {scaledAmount} {ingredient.unit}
                    </Text>

                    <Text style={[styles.originalAmountText, { color: theme.text + "88" }]}>
                      ({amount} {ingredient.unit} for {recipe.servings} servings)
                    </Text>
                  </View>
                );
              })}

            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },

  header: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },

  scrollContent: { paddingBottom: 40, },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  contentWrapper: {
    width: "100%",
    maxWidth: 500,        // 🔥 keeps it centered nicely
    alignSelf: "center",  // 🔥 centers horizontally
    paddingHorizontal: 20,
  },



  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
  },

  servingsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // 🔥 THIS fixes centering
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

  row: {
    marginTop: 12,
    alignItems: "center",
  },

  ingredientText: { fontSize: 16 },

  originalAmountText: { fontSize: 12 },


});