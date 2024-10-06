import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";
import { ArrowRight, Mail } from "lucide-react-native";

export const EmailButton = () => {
  return (
    <Link style={styles.container} href="./" asChild>
      <ImageBackground
        source={require("../assets/images/Card.png")}
        style={styles.image}
        resizeMode="cover"
      >
        <View style={styles.contentContainer}>
          <Mail color={Colors.ZINC200} style={styles.icon} />
          <View style={styles.textContainer}>
            <Text
              style={styles.textTitle}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              Verifique seu E-mail
            </Text>
            <Text style={styles.textDescription}>
              Para garantir mais segurança para sua conta, faça a verificação do
              seu E-mail
            </Text>
          </View>
          <ArrowRight color={Colors.ZINC200} style={styles.icon} />
        </View>
      </ImageBackground>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 10,
    marginVertical: 20,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 110,
    justifyContent: "center",
    borderRadius: 10,
    overflow: "hidden",
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    height: "100%",
    width: "100%",
  },
  icon: {
    marginHorizontal: 10,
  },
  textContainer: {
    flex: 1,
    alignItems: "flex-start",
    paddingHorizontal: 10,
  },
  textTitle: {
    color: Colors.ZINC200,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
    flexShrink: 1,
  },
  textDescription: {
    color: Colors.ZINC200,
    fontSize: 14,
    textAlign: "left",
    flexShrink: 1,
  },
});
