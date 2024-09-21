import React from "react";
import { Tabs } from "expo-router";
import { Colors } from "@/constants/Colors";
import { House, User, LayoutDashboard, Settings2 } from "lucide-react-native";
import { StyleSheet, View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.ZINC900,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          height: 70,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: focused ? Colors.ZINC950 : Colors.ZINC900 },
              ]}
            >
              <House
                color={focused ? Colors.MAIN : Colors.ZINC200}
                strokeWidth={1}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: focused ? Colors.ZINC950 : Colors.ZINC900 },
              ]}
            >
              <User
                color={focused ? Colors.MAIN : Colors.ZINC200}
                strokeWidth={1}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="services"
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: focused ? Colors.ZINC950 : Colors.ZINC900 },
              ]}
            >
              <LayoutDashboard
                color={focused ? Colors.MAIN : Colors.ZINC200}
                strokeWidth={1}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: focused ? Colors.ZINC950 : Colors.ZINC900 },
              ]}
            >
              <Settings2
                color={focused ? Colors.MAIN : Colors.ZINC200}
                strokeWidth={1}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    padding: 10,
    borderRadius: 15,
  },
});
