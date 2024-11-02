import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ButtonComponent } from "@/components/button";
import { Colors } from "@/constants/Colors";
import { InputComponent } from "@/components/input";
import { Captions, Lock } from "lucide-react-native";
import { router } from "expo-router";
import { signin } from "@/src/services/userServices";
import { RotatingLoaderCircle } from "@/assets/loadScreen";
import { TokenPayload, UserContext, UserContextType } from "@/app/context";
import { ErrorStatus } from "@/components/errorStatus";
import { getUserTrustedDevices } from "@/src/services/deviceServices";
import NetInfo from "@react-native-community/netinfo";
import { jwtDecode } from "jwt-decode";

interface Data {
  cpf: string;
  password: string;
}

interface DevicesData {
  id: string;
  ip_address: string;
  location: string;
  created_at: string;
  updated_at: string;
}

const Login = () => {
  const [data, setData] = useState<Data>({ cpf: "", password: "" });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setToken } = useContext(UserContext) as UserContextType;
  const [registeredDevice, setRegisteredDevice] = useState<Boolean>(false);

  const handleCpfChange = (value: string) => {
    let formattedCpf = value.replace(/\D/g, "");
    formattedCpf = formattedCpf.replace(/(\d{3})(\d)/, "$1.$2");
    formattedCpf = formattedCpf.replace(/(\d{3})(\d)/, "$1.$2");
    formattedCpf = formattedCpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    setData((prevData) => ({ ...prevData, cpf: formattedCpf }));
  };

  const removeCpfFormatting = (cpf: string) => {
    return cpf.replace(/\D/g, "");
  };

  const verifyDevice = async (decoded: TokenPayload, token: string) => {
    const response = await getUserTrustedDevices(decoded.id, token);

    // Pegar o IP do dispositivo
    const netInfo = await NetInfo.fetch();
    const ipAddress =
      netInfo.details && "ipAddress" in netInfo.details
        ? (netInfo.details.ipAddress as string)
        : undefined;

    const trustedDevice = response.data.some(
      (device: DevicesData) => device.ip_address === ipAddress,
    );

    if (trustedDevice) setRegisteredDevice(true);
    else setRegisteredDevice(false);
  };

  const onLogin = async () => {
    if (!data.cpf || !data.password) {
      setErrorMessage("Preencha o CPF e a senha para continuar!");
      return;
    }

    try {
      // Tela de carregamento
      setIsLoading(true);

      // Formata e envidar dados para o context
      const formattedData = {
        ...data,
        cpf: removeCpfFormatting(data.cpf),
      };

      const response = await signin(formattedData);
      setToken(response?.data.accessToken);

      // Decodificar token para verificar dispositivo
      const decoded: TokenPayload = jwtDecode(response?.data.accessToken);

      await verifyDevice(decoded, response?.data.accessToken);

      if (registeredDevice) {
        router.push("/(tabs)/home");
      } else {
        router.push("/(tabs)/services/devices");
      }

      setData({ cpf: "", password: "" });
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Erro ao fazer login!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof Data, value: string) => {
    setData((prevData) => ({ ...prevData, [field]: value }));
  };

  useEffect(() => {
    setErrorMessage("");
  }, [data]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
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
          {errorMessage ? <ErrorStatus text={errorMessage} /> : null}
          <InputComponent
            value={data.cpf}
            onChangeText={handleCpfChange}
            place="CPF"
            image={
              <Captions color={Colors.ZINC200} size="20" strokeWidth={1} />
            }
            isPassword={false}
            height={50}
            width={335}
            editable={true}
          />
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

          <ButtonComponent
            text="ACESSAR"
            color={Colors.MAIN}
            onPress={onLogin}
            disabled={isLoading}
          />
        </>
      )}
    </KeyboardAvoidingView>
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
});
