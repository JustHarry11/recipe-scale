// app/_layout.tsx
import { Tabs } from "expo-router";
import React from "react";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { RecipeProvider } from "../src/context/RecipeContext";

export default function TabLayout() {

  return (
    <RecipeProvider>
      <Tabs
        screenOptions={{
          headerShown: false,

          // 👇 Active icon/text
          tabBarActiveTintColor: "rgba(255,255,255,0.6)",
          

          // 👇 Inactive icon/text
          tabBarInactiveTintColor: "#fff",

          // 👇 Background
          tabBarStyle: {
            backgroundColor: '#ea870d', 
            borderTopWidth: 0,
            height: 70,
            paddingBottom: 10,
          },

          tabBarLabelStyle: {
            fontSize: 12,
          },
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