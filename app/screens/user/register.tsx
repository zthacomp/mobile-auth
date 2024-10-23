import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { ButtonComponent } from "@/components/button";
import { Colors } from "@/constants/Colors";
import { InputComponent } from "@/components/input";
import {
  AtSign,
  Calendar,
  Captions,
  Lock,
  Phone,
  User,
} from "lucide-react-native";
import { RotatingLoaderCircle } from "@/assets/loadScreen";
import { router } from "expo-router";
import { signup } from "@/src/services/userServices";

interface Data {
  password: string;
  confirmPassword: string;
  name: string;
  birth_date: string;
  cellphone: string;
  gender: string;
  email: string;
  cpf: string;
  role: string;
}

const register = () => {
  const [data, setData] = useState<Data>({
    password: "",
    confirmPassword: "",
    name: "",
    birth_date: "",
    cellphone: "",
    gender: "",
    email: "",
    cpf: "",
    role: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createAccount = async () => {
    if (
      !data.password ||
      !data.confirmPassword ||
      !data.name ||
      !data.birth_date ||
      !data.cellphone ||
      !data.gender ||
      !data.email ||
      !data.cpf ||
      !data.role
    ) {
      setErrorMessage("Preencha todos os campos para continuar!");
      return;
    }

    if (data.password !== data.confirmPassword) {
      setErrorMessage("As senhas não coincidem.");
      return;
    }

    try {
      setIsLoading(true);
      await signup(data);
      router.push("./");
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof Data, values: string) => {
    setData((prevData) => ({ ...prevData, [field]: values }));
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <RotatingLoaderCircle />
        </View>
      ) : (
        <>
          <View>
            <View style={styles.text}>
              <Text style={styles.title}>Pessoa física</Text>
              <Text style={styles.subTitle}>
                Preencha suas informações pessoais.
              </Text>
            </View>

            <InputComponent
              value={data.name}
              onChangeText={(value) => handleInputChange("name", value)}
              place="Nome completo"
              image={<User color={Colors.ZINC200} size="20" strokeWidth={1} />}
              isPassword={false}
              height={50}
              width={335}
            />
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
              value={data.birth_date}
              onChangeText={(value) => handleInputChange("birth_date", value)}
              place="Data de nascimento"
              image={
                <Calendar color={Colors.ZINC200} size="20" strokeWidth={1} />
              }
              isPassword={false}
              height={50}
              width={335}
            />
            <InputComponent
              value={data.cellphone}
              onChangeText={(value) => handleInputChange("cellphone", value)}
              place="Celular"
              image={<Phone color={Colors.ZINC200} size="20" strokeWidth={1} />}
              isPassword={false}
              height={50}
              width={335}
            />
            <InputComponent
              value={data.email}
              onChangeText={(value) => handleInputChange("email", value)}
              place="E-mail"
              image={
                <AtSign color={Colors.ZINC200} size="20" strokeWidth={1} />
              }
              isPassword={false}
              height={50}
              width={335}
            />
            <InputComponent
              value={data.gender}
              onChangeText={(value) => handleInputChange("gender", value)}
              place="Gênero"
              image={
                <AtSign color={Colors.ZINC200} size="20" strokeWidth={1} />
              }
              isPassword={false}
              height={50}
              width={335}
            />
            <InputComponent
              value={data.role}
              onChangeText={(value) => handleInputChange("role", value)}
              place="Função"
              image={
                <AtSign color={Colors.ZINC200} size="20" strokeWidth={1} />
              }
              isPassword={false}
              height={50}
              width={335}
            />
            <View style={styles.text}>
              <Text style={styles.title}>Insira uma senha</Text>
              <Text style={styles.subTitle}>
                Para garantir a segurança dos seus dados,{"\n"} sua senha deve
                ter:
              </Text>
              <Text style={styles.subTitle}> • Mínimo de 8 caracteres;</Text>
              <Text style={styles.subTitle}>
                {" "}
                • Pelo menos uma letra maiúscula.
              </Text>
              <Text style={styles.subTitle}>
                {" "}
                • Pelo menos um caractere especial (como !, @, #,
              </Text>
              <Text style={styles.subTitle}> $, etc.).</Text>
            </View>
            <InputComponent
              value={data.password}
              onChangeText={(value) => handleInputChange("password", value)}
              place="Senha"
              image={<Lock color={Colors.ZINC200} size="20" strokeWidth={1} />}
              isPassword={true}
              height={50}
              width={335}
            />
            <InputComponent
              value={data.confirmPassword}
              onChangeText={(value) =>
                handleInputChange("confirmPassword", value)
              }
              place="Confirme sua senha"
              image={<Lock color={Colors.ZINC200} size="20" strokeWidth={1} />}
              isPassword={true}
              height={50}
              width={335}
            />
          </View>
          {errorMessage ? (
            <Text style={styles.error}>{errorMessage}</Text>
          ) : null}
          <View style={styles.button}>
            <ButtonComponent
              text="CONTINUAR"
              color={Colors.MAIN}
              onPress={createAccount}
              disabled={false}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ZINC950,
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: { paddingLeft: 10, paddingTop: 50, paddingBottom: 20 },
  button: { paddingBottom: 30 },
  title: {
    fontSize: 25,
    color: Colors.ZINC200,
    fontFamily: "Inter_700Bold",
  },
  subTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    color: Colors.ZINC400,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color: "#cf4d3f",
    margin: 10,
  },
});
