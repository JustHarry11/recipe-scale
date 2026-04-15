// app/_layout.tsx
import { Tabs } from "expo-router";
import React from "react";
import { Colors } from "@/constants/theme";
import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { RecipeProvider } from "../src/context/RecipeContext";

export default function TabLayout() {

  return (
    <RecipeProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.light.tint,
          headerShown: false,
          tabBarButton: HapticTab,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Recipes",
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="add-recipe"
          options={{
            title: "Add Recipe",
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
          }}
        />
      </Tabs>
    </RecipeProvider>
  );
}