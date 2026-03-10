import { View, Text, StyleSheet } from "react-native";

export default function RecipesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Recipes</Text>
      <Text>Here you will see all your saved recipes.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
});