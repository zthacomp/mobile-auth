import { StyleSheet, Text, View } from "react-native";
import React from "react";

const config = () => {
  return (
    <View style={styles.container}>
      <Text>config</Text>
    </View>
  );
};

export default config;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
