import { StyleSheet, Text, View } from "react-native";
import React from "react";

const services = () => {
  return (
    <View style={styles.container}>
      <Text>Servicos</Text>
    </View>
  );
};

export default services;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
