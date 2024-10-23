import { RotatingLoaderCircle } from "@/assets/loadScreen";
import { BackButtonComponent } from "@/components/backButton";
import { ButtonComponent } from "@/components/button";
import { InputComponent } from "@/components/input";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { Lock } from "lucide-react-native";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { UserContext, UserContextType } from "@/app/context";
import { updateUserAndPerson } from "@/src/services/userServices";
import dayjs from "dayjs";
import { SuccessStatus } from "@/components/successMessage";
import { ErrorStatus } from "@/components/errorStatus";

interface Data {
  password: string;
  confirmPassword: string;
}

const Privacy = () => {
  const [disabled, setDisabled] = useState<boolean>(true);
  const [data, setData] = useState<Data>({ password: "", confirmPassword: "" });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [sucessMessage, setSucessMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { userInfo, token } = useContext(UserContext) as UserContextType;

  const updatePassword = async () => {
    if (!data.password || !data.confirmPassword) {
      setErrorMessage("Preencha o CPF e a senha para continuar!");
      return;
    }

    if (!userInfo || !userInfo.id) {
      setErrorMessage("Usuário não encontrado!");
      return;
    }

    if (!token) {
      setErrorMessage("Token é necessário");
      return;
    }

    try {
      const updatedData = {
        email: userInfo?.email || "",
        password: data.password,
        name: userInfo?.person.name || "",
        birth_date:
          dayjs(userInfo.person.birth_date).format("YYYY-MM-DD") || "",
        cellphone: userInfo?.person.cellphone || "",
        gender: userInfo?.person.gender || "",
      };

      setIsLoading(true);
      await updateUserAndPerson(updatedData, userInfo.id, token);
      setSucessMessage("Dados atualizados com sucesso");
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    } finally {
      setIsLoading(false);
      data.password = "";
      data.confirmPassword = "";
    }
  };

  const handleInputChange = (field: keyof Data, value: string) => {
    setData((prevData) => ({ ...prevData, [field]: value }));
  };

  useEffect(() => {
    const { password, confirmPassword } = data;

    if (!password || !confirmPassword) {
      setDisabled(true);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Senhas diferentes!");
      setDisabled(true);
      return;
    }

    if (password.length < 8) {
      setErrorMessage("A senha deve ter no mínimo 8 caracteres!");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setErrorMessage("A senha deve conter pelo menos uma letra maiúscula!");
      return;
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setErrorMessage("A senha deve conter pelo menos um caractere especial!");
      return;
    }

    setErrorMessage("");
    setDisabled(false);
  }, [data.password, data.confirmPassword]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <RotatingLoaderCircle />
        </View>
      ) : (
        <>
          <BackButtonComponent text="Privacidade" link="../profile" />
          <View style={styles.content}>
            <View style={styles.text}>
              <Text style={styles.subTitle}>
                Para garantir a segurança dos seus dados, sua senha deve ter:
              </Text>
              <Text style={styles.subTitle}> • Mínimo de 8 caracteres;</Text>
              <Text style={styles.subTitle}>
                {" "}
                • Pelo menos uma letra maiúscula.
              </Text>
              <Text style={styles.subTitle}>
                {" "}
                • Pelo menos um caractere especial (como !, @, #, $, etc.).
              </Text>
            </View>
            <InputComponent
              value={data.password}
              onChangeText={(value) => handleInputChange("password", value)}
              place="Senha"
              image={<Lock color={Colors.ZINC200} size="20" strokeWidth={1} />}
              isPassword={true}
              height={50}
              width={335}
              editable={true}
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
              editable={true}
            />
            {sucessMessage ? <SuccessStatus text={sucessMessage} /> : null}
            {errorMessage ? <ErrorStatus text={errorMessage} /> : null}
            <ButtonComponent
              text="SALVAR"
              color={Colors.MAIN}
              onPress={updatePassword}
              disabled={disabled}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default Privacy;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.ZINC950,
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    paddingTop: 80,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.ZINC950,
  },
  loadingText: {
    color: Colors.ZINC400,
    fontFamily: "Inter_700Bold",
  },
  content: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  subTitle: {
    fontSize: 12,
    color: Colors.ZINC400,
    fontFamily: "Inter_700Bold",
  },
  text: {
    paddingTop: 20,
    marginHorizontal: 25,
    alignItems: "flex-start",
    paddingBottom: 10,
  },
  error: {
    color: "#cf4d3f",
    margin: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
