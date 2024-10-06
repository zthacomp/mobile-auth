import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";
import { ArrowRight, Mail } from "lucide-react-native";
import { Image, StyleSheet, Text, View } from "react-native";

export const EmailButton = () => {
  return (
    <Link style={styles.container} href="./">
      <Image
        source={require("../assets/images/Card.png")}
        style={styles.image}
      />
      <View style={styles.contentContainer}>
        <Mail color={Colors.ZINC200} style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.textTitle} numberOfLines={1} adjustsFontSizeToFit>
            Verifique seu E-mail
          </Text>
          <Text style={styles.textDescription}>
            Para garantir mais segurança para sua conta, faça a verificação do
            seu E-mail
          </Text>
        </View>
        <ArrowRight color={Colors.ZINC200} style={styles.icon} />
      </View>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    borderRadius: 10,
    margin: 20,
    overflow: "hidden",
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    height: 100,
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
