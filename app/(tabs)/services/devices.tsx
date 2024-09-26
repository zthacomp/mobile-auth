import { useFontsLoaded } from "@/assets/fonts/fonts";
import { UserComponent } from "@/components/user";
import { Colors } from "@/constants/Colors";
import { StyleSheet, Text, View } from "react-native";
import { ButtonComponent } from "../../../components/button";
import { Link } from "expo-router";

const devices = () => {
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
        <Text style={styles.text}>Código de acesso</Text>
        <Text style={styles.text}>Tempo restante 54s</Text>
        <ButtonComponent text="Entar" color={Colors.MAIN} link="./" />
        <Link href="../home">Cancelar</Link>
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
  text: {
    color: Colors.ZINC200,
    fontSize: 13,
    marginVertical: 10,
    fontFamily: "Inter_400Regular",
  },
});
