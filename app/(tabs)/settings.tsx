import { StyleSheet, Text, View } from "react-native";
import React from "react";

const settings = () => {
  return (
    <View style={styles.container}>
      <Text>configuracaos</Text>
    </View>
  );
};

export default settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
