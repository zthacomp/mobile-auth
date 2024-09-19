import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { ButtonComponent } from "@/components/button";

const home = () => {
  return <View style={styles.container}></View>;
};

export default home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
  },

  Text: {
    color: Colors.loginText,
  },
});
