import { Stack } from "expo-router";
import { RecipeProvider } from "./src/context/RecipeContext";

export default function RootLayout() {
  return (
    <RecipeProvider>
      <Stack>
        {/* Tabs live inside the stack */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* Recipe detail screen */}
        <Stack.Screen
          name="recipe/[id]"
          options={{
            title: "",

            headerStyle: {
              backgroundColor: '#ea870d',
            },

            headerShadowVisible: false,

            headerTintColor: "#fff",
          }}
        />
      </Stack>
    </RecipeProvider>
  );
}