import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ButtonComponent } from "@/components/button";
import { Colors } from "@/constants/Colors";
import { InputComponent } from "@/components/input";
import { Captions, Lock } from "lucide-react-native";
import { Link } from "expo-router";

const login = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("@/assets/images/Logo.png")}
      />
      <InputComponent
        value=""
        place="CPF"
        image={<Captions color={Colors.ZINC200} size="20" strokeWidth={1} />}
        isPassword={false}
        height={50}
        width={335}
      />
      <InputComponent
        value=""
        place="Senha"
        image={<Lock color={Colors.ZINC200} size="20" strokeWidth={1} />}
        isPassword={true}
        height={50}
        width={335}
      />
      <ButtonComponent
        text="ACESSAR"
        color={Colors.MAIN}
        link={"../../(tabs)/home"}
      />
      <Text style={styles.text}>
        Não tem uma conta?{" "}
        <Link style={styles.link} href={"./register"}>
          Cadastre-se
        </Link>
      </Text>
    </View>
  );
};

export default login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ZINC950,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: Colors.ZINC500,
    margin: 15,
    fontFamily: "Inter_700Bold",
  },
  image: {
    marginBottom: 20,
    height: 200,
    width: 200,
  },
  link: {
    color: Colors.ZINC200,
  },
});
