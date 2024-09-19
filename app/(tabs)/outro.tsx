import { StyleSheet, Text, View } from "react-native";
import React from "react";

const outro = () => {
  return (
    <View style={styles.container}>
      <Text>outro</Text>
    </View>
  );
};

export default outro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
