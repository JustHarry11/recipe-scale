import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import { useRecipes } from "../src/context/RecipeContext";
import { useRouter } from "expo-router";

export default function RecipesScreen() {
  const { recipes } = useRecipes();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Recipes</Text>

      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => router.push(`/recipe/${item.id}`)}
          >
            <Text style={styles.recipeTitle}>{item.name}</Text>
            <Text>{item.servings} servings</Text>
          </Pressable>
        )}
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
    backgroundColor: "#eee",
    marginBottom: 12,
  },

  recipeTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
  },

  row: {
    marginTop: 8,
  }
});