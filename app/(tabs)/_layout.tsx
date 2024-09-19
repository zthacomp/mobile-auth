import { StyleSheet, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "home",
          tabBarIcon: () => (
            <Image source={require("../../assets/images/icons/house.png")} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "profile",
          tabBarIcon: () => (
            <Image source={require("../../assets/images/icons/user.png")} />
          ),
        }}
      />
      <Tabs.Screen
        name="outro"
        options={{
          tabBarLabel: "outro",
          tabBarIcon: () => (
            <Image
              source={require("../../assets/images/icons/layout-dashboard.png")}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="config"
        options={{
          tabBarLabel: "config",
          tabBarIcon: () => (
            <Image
              source={require("../../assets/images/icons/settings-2.png")}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
  },
});
