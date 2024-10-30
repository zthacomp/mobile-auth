import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { ButtonComponent } from "@/components/button";
import { Colors } from "@/constants/Colors";
import { InputComponent } from "@/components/input";
import { Captions, Lock } from "lucide-react-native";
import { router } from "expo-router";
import { signin } from "@/src/services/userServices";
import { RotatingLoaderCircle } from "@/assets/loadScreen";
import { UserContext, UserContextType } from "@/app/context";
import { ErrorStatus } from "@/components/errorStatus";
import { getUserTrustedDevices } from "@/src/services/deviceServices";
import NetInfo from "@react-native-community/netinfo";

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
  const { userInfo, token, setToken } = useContext(
    UserContext,
  ) as UserContextType;
  const [devices, setDevices] = useState<DevicesData[]>([]);

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

  const verifyDevice = async () => {
    if (!userInfo || !userInfo.id) {
      setErrorMessage("Usuário não encontrado!");
      return;
    }

    if (!token) {
      setErrorMessage("Token é necessário");
      return;
    }

    const response = await getUserTrustedDevices(userInfo.id, token);
    setDevices(response.data);

    NetInfo.fetch().then((state) => {
      const ipAddress =
        state.details && "ipAddress" in state.details
          ? state.details.ipAddress
          : undefined;
      console.log("IP Address:", ipAddress);

      const isDeviceTrusted = devices.some(
        (device) => device.ip_address === ipAddress,
      );

      if (isDeviceTrusted) {
        router.push("/(tabs)/home");
      } else {
        router.push("/(tabs)/services/devices");
      }
    });
  };

  const onLogin = async () => {
    if (!data.cpf || !data.password) {
      setErrorMessage("Preencha o CPF e a senha para continuar!");
      return;
    }

    try {
      setIsLoading(true);
      const formattedData = {
        ...data,
        cpf: removeCpfFormatting(data.cpf),
      };
      const response = await signin(formattedData);
      setToken(response?.data.accessToken);

      verifyDevice();

      data.cpf = "";
      data.password = "";
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
