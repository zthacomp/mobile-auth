import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { ButtonComponent } from "@/components/button";
import { Colors } from "@/constants/Colors";
import { InputComponent } from "@/components/input";
import { Captions, Lock } from "lucide-react-native";
import { Link, router } from "expo-router";
import { signin } from "@/src/userServices";
import { RotatingLoaderCircle } from "@/assets/loadScreen";
import { UserContext, UserContextType } from "@/app/context";

interface Data {
  cpf: string;
  password: string;
}

const Login = () => {
  const [data, setData] = useState<Data>({ cpf: "", password: "" });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { token, setToken } = useContext(UserContext) as UserContextType;

  const onLogin = async () => {
    setIsLoading(true);
    try {
      const response = await signin(data);
      setToken(response.data.accessToken);
      router.push("/(tabs)/home");
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof Data, value: string) => {
    setData((prevData) => ({ ...prevData, [field]: value }));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.ZINC950} />
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <RotatingLoaderCircle />
        </View>
      ) : (
        <>
          <Image
            style={styles.image}
            source={require("@/assets/images/Logo.png")}
          />
          {errorMessage ? (
            <Text style={styles.error}>{errorMessage}</Text>
          ) : null}
          <InputComponent
            value={data.cpf}
            onChangeText={(value) => handleInputChange("cpf", value)}
            place="CPF"
            image={
              <Captions color={Colors.ZINC200} size="20" strokeWidth={1} />
            }
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

          <ButtonComponent
            text="ACESSAR"
            color={Colors.MAIN}
            onPress={onLogin}
            disabled={isLoading}
          />
          <Text style={styles.text}>
            Não tem uma conta?{" "}
            <Text>
              <Link style={styles.link} href={"./register"}>
                Cadastre-se
              </Link>
            </Text>
          </Text>
        </>
      )}
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
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
