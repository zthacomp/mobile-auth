import { useFontsLoaded } from "@/assets/fonts/fonts";
import { UserComponent } from "@/components/user";
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";

const qrCode = () => {
  const fontsLoaded = useFontsLoaded();

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading fonts...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <UserComponent />
      </View>
      <View style={styles.innerContainer}>
        <Text style={styles.text}>
          Escaneie o QR code para acessar a sua conta em um dos nossos sistemas
        </Text>
        <Image source={require("@/assets/images/QrCode.png")} />
        <Text style={styles.text}>
          Certifique-se de que a permissão para acessar a câmera está habilitada
        </Text>
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
    fontSize: 13,
    marginVertical: 10,
    fontFamily: "Inter_400Regular",
    marginHorizontal: "10%",
    textAlign: "center",
  },
});
