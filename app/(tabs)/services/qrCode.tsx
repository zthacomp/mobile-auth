import { UserContext, UserContextType } from "@/app/context";
import { ErrorStatus } from "@/components/errorStatus";
import { UserComponent } from "@/components/userComponent";
import { Colors } from "@/constants/Colors";
import { generate2FAHandler } from "@/src/services/userServices";
import { useContext, useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const qrCode = () => {
  const { userInfo, token } = useContext(UserContext) as UserContextType;
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [data, setData] = useState<string>("");

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
      setData(response.data.qrCodeUrl);
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    generateQrCode();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <UserComponent />
      </View>
      <View style={styles.innerContainer}>
        <Text style={styles.text}>
          Escaneie o QR code para acessar a sua conta em um dos nossos sistemas
        </Text>
        {data ? (
          <Image source={{ uri: data }} style={styles.qrCodeImage} />
        ) : (
          <Text style={styles.text}>Carregando QR Code...</Text>
        )}
        <Text style={styles.text}>
          Certifique-se de que a permissão para acessar a câmera está habilitada
        </Text>
        {errorMessage ? <ErrorStatus text={errorMessage} /> : null}
      </View>
    </View>
  );
};

export default qrCode;

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
  qrCodeImage: {
    width: 400,
    height: 400,
    marginVertical: 10,
  },
});
