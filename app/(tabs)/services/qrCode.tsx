import { UserContext, UserContextType } from "@/app/context";
import { UserComponent } from "@/components/userComponent";
import { Colors } from "@/constants/Colors";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const QrCode = () => {
  const { setSecret } = useContext(UserContext) as UserContextType;
  const [facing] = useState<CameraType>("back");
  const [cameraPermission] = useCameraPermissions();
  const [permissionGranted, setPermissionGranted] = useState(false);

  const extractSecretFromUrl = (url: string) => {
    const secretMatch = url.match(/secret=([^&]+)/);
    return secretMatch ? secretMatch[1] : null;
  };

  useEffect(() => {
    if (cameraPermission?.granted) {
      setPermissionGranted(true);
    }
  }, [cameraPermission]);

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
          {permissionGranted ? (
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
          ) : (
            <View style={styles.permissionContainer}>
              <Text style={styles.text}>
                Certifique-se de que a permissão para acessar a câmera está
                habilitada
              </Text>
            </View>
          )}
        </View>
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
    textAlign: "center",
  },
  permissionContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  camera: {
    width: 300,
    height: 300,
    marginVertical: 20,
  },
});
