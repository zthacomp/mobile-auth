import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { ButtonComponent } from "@/components/button";
import { Colors } from "@/constants/Colors";
import { InputComponent } from "@/components/input";
import { Captions, Lock } from "lucide-react-native";
import { Link, router } from "expo-router";
import { signin } from "@/src/lib";

const Login = () => {
  interface Data {
    cpf: string;
    password: string;
  }

  const [data, setData] = useState<Data>({ cpf: "", password: "" });
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onLogin = async () => {
    try {
      const response = await signin(data);
      const token = response.data.accessToken;
      console.log(token);
      router.push("/(tabs)/home");
    } catch (error) {
      console.error(error);
      setErrorMessage("CPF ou senha errada.");
    }
  };

  const handleInputChange = (field: keyof Data, value: string) => {
    setData((prevData) => ({ ...prevData, [field]: value }));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.ZINC950} />
      <Image
        style={styles.image}
        source={require("@/assets/images/Logo.png")}
      />
      <InputComponent
        value={data.cpf}
        onChangeText={(value) => handleInputChange("cpf", value)}
        place="CPF"
        image={<Captions color={Colors.ZINC200} size="20" strokeWidth={1} />}
        isPassword={false}
        height={50}
        width={335}
      />
      <InputComponent
        value={data.password}
        onChangeText={(value) => handleInputChange("password", value)}
        place="Senha"
        image={<Lock color={Colors.ZINC200} size="20" strokeWidth={1} />}
        isPassword={true}
        height={50}
        width={335}
      />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <ButtonComponent text="ACESSAR" color={Colors.MAIN} onPress={onLogin} />
      <Text style={styles.text}>
        Não tem uma conta?{" "}
        <Text>
          <Link style={styles.link} href={"./register"}>
            Cadastre-se
          </Link>
        </Text>
      </Text>
    </View>
  );
};

export default Login;

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
    height: "20%",
    width: 200,
  },
  link: {
    color: Colors.ZINC200,
  },
  error: {
    color: "#cf4d3f",
    margin: 10,
  },
});
