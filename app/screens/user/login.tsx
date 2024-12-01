import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  View,
  Alert,
  Text,
  Pressable,
} from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";
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
import { CpfFormatting, removeCpfFormatting } from "@/util/cpfFormatting";

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
  const [isBiometricSupported, setIsBiometricSupported] =
    useState<boolean>(false);
  const { setToken } = useContext(UserContext) as UserContextType;

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();

      // Habilita biometria somente se o dispositivo for compatível e houver biometria cadastrada
      setIsBiometricSupported(compatible && enrolled);

      // Verifica se a senha está salva
      if (compatible && enrolled) {
        const savedPassword = await SecureStore.getItemAsync("userPassword");
        if (savedPassword) {
          handleBiometricAuth();
        }
      }
    })();
  }, []);

  const verifyDevice = async (
    decoded: TokenPayload,
    token: string,
  ): Promise<boolean> => {
    const response = await getUserTrustedDevices(decoded.id, token);

    // Pega o IP do celular
    const netInfo = await NetInfo.fetch();
    const ipAddress =
      netInfo.details && "ipAddress" in netInfo.details
        ? (netInfo.details.ipAddress as string)
        : undefined;

    // Retorna true se tiver algum celular com o mesmo IP do celular atual
    return response.data.some(
      (device: DevicesData) => device.ip_address === ipAddress,
    );
  };

  const onLogin = async () => {
    if (!data.cpf || !data.password) {
      setErrorMessage("Preencha o CPF e a senha para continuar!");
      return;
    }

    try {
      // Tela de loading
      setIsLoading(true);

      const formattedData = { ...data, cpf: removeCpfFormatting(data.cpf) };
      // Enviar as informações para fazer o login
      const response = await signin(formattedData);
      setToken(response?.data.accessToken);

      const decoded: TokenPayload = jwtDecode(response?.data.accessToken);

      const isDeviceRegistered = await verifyDevice(
        decoded,
        response?.data.accessToken,
      );

      if (isDeviceRegistered) {
        router.push("/(tabs)/home");
      } else {
        router.push("/screens/devices");
      }

      // Salva o CPF e a senha de forma segura após login bem-sucedido
      await SecureStore.setItemAsync("userPassword", data.password);
      await SecureStore.setItemAsync("userCpf", removeCpfFormatting(data.cpf));

      setData({ cpf: "", password: "" });
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBiometricAuth = async () => {
    const { success } = await LocalAuthentication.authenticateAsync({
      promptMessage: "Autentique-se com sua biometria",
    });

    if (success) {
      // Obtém o CPF e a senha salvos e faz login automático
      const savedPassword = await SecureStore.getItemAsync("userPassword");
      const savedCpf = await SecureStore.getItemAsync("userCpf");

      if (savedPassword && savedCpf) {
        const dataBio: Data = {
          cpf: savedCpf,
          password: savedPassword,
        };

        const response = await signin(dataBio);
        setToken(response?.data.accessToken);

        const decoded: TokenPayload = jwtDecode(response?.data.accessToken);

        const isDeviceRegistered = await verifyDevice(
          decoded,
          response?.data.accessToken,
        );

        if (isDeviceRegistered) {
          router.push("/(tabs)/home");
        } else {
          router.push("/screens/devices");
        }
      }
    } else {
      Alert.alert("Autenticação falhou", "Por favor, tente novamente.");
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
            onChangeText={(value) =>
              handleInputChange("cpf", CpfFormatting(value))
            }
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

          {isBiometricSupported ? (
            <Pressable onPress={handleBiometricAuth}>
              <Text style={styles.biobutton}>ENTRAR COM A BIOMETRIA</Text>
            </Pressable>
          ) : null}
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
  biobutton: {
    margin: 20,
    color: Colors.ZINC400,
    fontFamily: "Inter_600SemiBold",
    fontSize: 10,
    textDecorationLine: "underline",
  },
});
