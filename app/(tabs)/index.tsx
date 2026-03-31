// app/index.tsx
import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { useRecipes } from "../src/context/RecipeContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";

export default function RecipesScreen() {
  const router = useRouter();
  const { recipes, deleteRecipe } = useRecipes();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>My Recipes</Text>

      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        extraData={recipes}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: theme.tint + "22" }]}>
            <Pressable onPress={() => router.push(`/recipe/${item.id}`)}>
              <Text style={[styles.recipeTitle, { color: theme.text }]}>{item.name}</Text>
              <Text style={{ color: theme.text }}>{item.servings} servings</Text>
              <Text style={styles.ingredientsPreview}>
                {item.ingredients.slice(0, 2).map((i) => i.name).join(", ")}
                {item.ingredients.length > 2 && "..."}
              </Text>
            </Pressable>

            <Pressable style={styles.deleteButton} onPress={() => deleteRecipe(item.id)}>
              <Text style={styles.deleteText}>Delete</Text>
            </Pressable>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyTitle, { color: theme.text }]}>No recipes yet 🍳</Text>
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
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  card: { padding: 16, borderRadius: 12, marginBottom: 12 },
  recipeTitle: { fontSize: 18, fontWeight: "600", marginBottom: 4 },
  ingredientsPreview: { marginTop: 6, fontSize: 12, opacity: 0.6 },
  deleteButton: { marginTop: 10, alignSelf: "flex-end" },
  deleteText: { color: "red", fontWeight: "600" },
  emptyContainer: { marginTop: 60, alignItems: "center" },
  emptyTitle: { fontSize: 18, fontWeight: "600" },
  emptySubtitle: { marginTop: 8, fontSize: 14 },
});