import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ButtonComponent } from "@/components/button";
import { Colors } from "@/constants/Colors";
import { InputComponent } from "@/components/input";

const login = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/images/Logo.png")}
      />
      <InputComponent value="" place="CPF" image="" />
      <InputComponent value="" place="Senha" image="" />
      <ButtonComponent text="ACESSAR" color={Colors.mainGreen} />
      <Text style={styles.text}>Não tem uma conta? Cadastre-se</Text>
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
    margin: 15,
    fontFamily: "",
  },
  image: {
    marginBottom: 20,
  },
});
