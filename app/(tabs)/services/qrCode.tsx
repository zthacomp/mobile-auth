import { useState, useEffect, useContext } from "react";
import { UserContext, UserContextType } from "@/app/context";
import { CameraView, CameraType } from "expo-camera";
import { router } from "expo-router";
import { StyleSheet, Text, View, Dimensions, SafeAreaView } from "react-native";
import { Colors } from "@/constants/Colors";
import { UserComponent } from "@/components/userComponent";

const QrCode = () => {
  const { cameraPermission } = useContext(UserContext) as UserContextType;
  const [facing] = useState<CameraType>("back");
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);

  const extractSecretFromUrl = (url: string) => {
    const secretMatch = url.match(/secret=([^&]+)/);
    return secretMatch ? secretMatch[1] : null;
  };

  useEffect(() => {
    if (cameraPermission) {
      setPermissionGranted(true);
    }
  }, [cameraPermission]);

  const { width, height } = Dimensions.get("window");
  const cameraWidth = width * 0.9;
  const safeHeight = height - 100;
  const cameraHeight = Math.min(cameraWidth * (4 / 3), safeHeight * 0.6);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <UserComponent />
        </View>
        <View style={styles.innerContainer}>
          <Text style={styles.text}>
            Escaneie o QR code para acessar a sua conta em um dos nossos
            sistemas
          </Text>

          <View style={styles.container}>
            {permissionGranted ? (
              <CameraView
                style={[
                  styles.camera,
                  { width: cameraWidth, height: cameraHeight },
                ]}
                facing={facing}
                onBarcodeScanned={({ data }: { data: string }) => {
                  const secret = extractSecretFromUrl(data);
                  if (secret) {
                    router.push("/(tabs)/services/authenticatorServices");
                  } else {
                    console.error("Nenhum secret encontrado no QR code.");
                  }
                }}
              />
            ) : (
              <Text style={styles.text}>
                Certifique-se de que a permissão para acessar a câmera está
                habilitada
              </Text>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default QrCode;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.ZINC950,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.ZINC950,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  topContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: "5%",
  },
  innerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: Colors.ZINC200,
    fontSize: 15,
    marginVertical: 20,
    fontFamily: "Inter_400Regular",
    marginHorizontal: "10%",
    textAlign: "center",
  },
  camera: {
    marginVertical: 20,
  },
});
