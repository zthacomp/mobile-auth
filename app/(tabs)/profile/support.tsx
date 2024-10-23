import { BackButtonComponent } from "@/components/backButton";
import { Colors } from "@/constants/Colors";
import { Mail, Phone } from "lucide-react-native";
import { Image, StyleSheet, Text, View } from "react-native";

const support = () => {
  return (
    <View style={styles.container}>
      <BackButtonComponent text="Suporte" link="../profile" />
      <View style={styles.content}>
        <Image
          style={styles.img}
          source={require("../../../assets/images/Logo.png")}
        />
        <View style={styles.views}>
          <Mail color={Colors.MAIN} />
          <Text style={styles.text}>E-mail: suporte.link@ztha.com.br</Text>
        </View>
        <View style={styles.views}>
          <Phone color={Colors.MAIN} />
          <Text style={styles.text}>Telefone: (75) 9989-6676</Text>
        </View>
        <View style={styles.views}>
          <Phone color={Colors.MAIN} />
          <Text style={styles.text}>Telefone: (75) 3261-1075</Text>
        </View>
      </View>
    </View>
  );
};

export default support;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.ZINC950,
    flex: 1,
    alignItems: "center",
  },
  content: {
    marginTop: 120,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
  },
  img: {
    margin: 40,
    height: "25%",
    width: 200,
  },
  views: {
    width: "100%",
    alignItems: "center",
    paddingLeft: "10%",
    flexDirection: "row",
    backgroundColor: Colors.ZINC900,
    borderRadius: 10,
    padding: 5,
    margin: 5,
  },
  text: {
    color: Colors.ZINC200,
    fontSize: 15,
    padding: "5%",
    fontFamily: "Inter_500Medium",
  },
});
