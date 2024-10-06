import { UserComponent } from "@/components/userComponent";
import { Colors } from "@/constants/Colors";
import { StyleSheet, Text, View } from "react-native";
import { ButtonComponent } from "../../../components/button";
import { Link } from "expo-router";
import { KeyRound } from "lucide-react-native";

const devices = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <UserComponent />
      </View>
      <View style={styles.innerContainer}>
        <KeyRound color={Colors.MAIN} size={50} strokeWidth={1} />
        <Text style={styles.title}>Entrando em um dispositivo novo?</Text>
        <Text style={styles.text}>
          Nunca escaneie um QR code de outros usuários
        </Text>
        <ButtonComponent text="ENTRAR" color={Colors.MAIN} link="./" />
        <Link
          style={{
            color: Colors.ZINC200,
            fontSize: 15,
            fontFamily: "Inter_400Regular",
          }}
          href="../home"
        >
          Cancelar
        </Link>
      </View>
    </View>
  );
};

export default devices;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ZINC950,
  },
  topContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "Inter_700Bold",
    color: Colors.ZINC200,
    fontSize: 16,
    paddingTop: 10,
  },
  text: {
    color: Colors.ZINC200,
    fontSize: 13,
    marginVertical: 10,
    fontFamily: "Inter_400Regular",
  },
});
