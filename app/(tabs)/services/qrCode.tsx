import { UserContext, UserContextType } from "@/app/context";
import { ErrorStatus } from "@/components/errorStatus";
import { UserComponent } from "@/components/userComponent";
import { Colors } from "@/constants/Colors";
import { generate2FAHandler } from "@/src/services/userServices";
import { CameraView, CameraType } from "expo-camera";
import { router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const QrCode = () => {
  const { userInfo, token, setSecret } = useContext(
    UserContext,
  ) as UserContextType;
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [data, setData] = useState<string>("");
  const [facing] = useState<CameraType>("back");

  const extractSecretFromUrl = (url: string) => {
    const secretMatch = url.match(/secret=([^&]+)/);
    return secretMatch ? secretMatch[1] : null;
  };

  useEffect(() => {
    const generateQrCode = async () => {
      try {
        if (!userInfo || !userInfo.id) {
          setErrorMessage("Usuário não encontrado!");
          return;
        }

        if (!token) {
          setErrorMessage("Token é necessário");
          return;
        }

        const response = await generate2FAHandler(userInfo.id, token);
        console.log(response.data);
        setData(response.data.qrCodeUrl);
      } catch (error: any) {
        setErrorMessage(
          error.response?.data?.message || "Erro ao gerar QR Code",
        );
      }
    };

    generateQrCode();
  }, [userInfo, token]);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <UserComponent />
      </View>
      <View style={styles.innerContainer}>
        <Text style={styles.text}>
          Escaneie o QR code para acessar a sua conta em um dos nossos sistemas
        </Text>

        <View style={styles.container}>
          <CameraView
            style={styles.camera}
            facing={facing}
            onBarcodeScanned={({ data }: { data: string }) => {
              const secret = extractSecretFromUrl(data);
              if (secret) {
                setSecret(secret);
                router.push("/(tabs)/services/authentication");
              } else {
                console.error("Nenhum secret encontrado no QR code.");
              }
            }}
          ></CameraView>
        </View>

        <Text style={styles.text}>
          Certifique-se de que a permissão para acessar a câmera está habilitada
        </Text>
        {errorMessage ? <ErrorStatus text={errorMessage} /> : null}
      </View>
    </View>
  );
};

export default QrCode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ZINC950,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  topContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: "20%",
  },
  innerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: Colors.ZINC200,
    fontSize: 15,
    marginVertical: 10,
    fontFamily: "Inter_400Regular",
    marginHorizontal: "10%",
    textAlign: "center",
  },
  permissionText: {
    color: Colors.ZINC200,
    fontSize: 18,
    marginVertical: 10,
    fontFamily: "Inter_600SemiBold",
  },
  camera: {
    width: 300,
    height: 300,
    marginVertical: 20,
  },
});
