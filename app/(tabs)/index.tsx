import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { useRecipes } from "../src/context/RecipeContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";

export default function RecipesScreen() {
  const router = useRouter();
  const { recipes } = useRecipes();

  // Detect current theme
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>My Recipes</Text>

      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={[styles.card, { backgroundColor: theme.tint + "22" }]}
            onPress={() => router.push(`/recipe/${item.id}`)}
          >
            <Text style={[styles.recipeTitle, { color: theme.text }]}>
              {item.name}
            </Text>
            <Text style={{ color: theme.text }}>{item.servings} servings</Text>
            <Text style={styles.ingredientsPreview}>
              {item.ingredients.slice(0, 2).map(i => i.name).join(", ")}
              {item.ingredients.length > 2 && "..."}
            </Text>
          </Pressable>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyTitle, { color: theme.text }]}>
              No recipes yet 🍳
            </Text>

            <Text style={[styles.emptySubtitle, { color: theme.text + "99" }]}>
              Tap “Add Recipe” to get started
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: "#f5f5f5",
  },

  recipeTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },

  servings: {
    marginTop: 4,
    opacity: 0.7,
  },
  
  ingredientsPreview: {
    marginTop: 6,
    fontSize: 12,
    opacity: 0.6,
  },

  emptyContainer: {
    marginTop: 60,
    alignItems: "center",
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
  },

  emptySubtitle: {
    marginTop: 8,
    fontSize: 14,
  },
});