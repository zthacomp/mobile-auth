import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ButtonComponent } from "@/components/button";
import { Colors } from "@/constants/Colors";

const login = () => {
  return (
    <View style={styles.container}>
      <ButtonComponent text="ACESSAR" color={Colors.mainGreen} />
      <Text style={styles.text}>Não tem uma conta?</Text>
    </View>
  );
};

export default login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    color: Colors.loginText,
  },
});
