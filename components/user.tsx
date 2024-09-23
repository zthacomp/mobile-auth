import { useFontsLoaded } from "@/assets/fonts/fonts";
import { Colors } from "@/constants/Colors";
import { Image, StyleSheet, Text, View } from "react-native";

export const UserComponent = () => {
  const fontsLoaded = useFontsLoaded();

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading fonts...</Text>
      </View>
    );
  }
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.name}>Nome do User</Text>
      </View>
      <Image
        style={styles.icon}
        source={require("@/assets/images/Logo.png")}
      ></Image>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 30,
    paddingTop: 60,
  },
  greeting: {
    color: Colors.ZINC200,
    fontSize: 15,
    fontFamily: "Inter_500Medium",
  },
  name: {
    color: Colors.ZINC200,
    fontSize: 25,
    fontFamily: "Inter_700Bold",
  },
  icon: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
});
