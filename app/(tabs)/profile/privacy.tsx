import { useFontsLoaded } from "@/assets/fonts/fonts";
import { BackButtonComponent } from "@/components/backButton";
import { ButtonComponent } from "@/components/button";
import { InputComponent } from "@/components/input";
import { Colors } from "@/constants/Colors";
import { Lock } from "lucide-react-native";

import { StyleSheet, Text, View } from "react-native";

const Privacy = () => {
  const fontsLoaded = useFontsLoaded();

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading fonts...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BackButtonComponent text="Privacidade" link="../profile" />
      <View style={styles.content}>
        <View style={styles.text}>
          <Text style={styles.subTitle}>
            Para garantir a segurança dos seus dados, sua senha deve ter:
          </Text>
          <Text style={styles.subTitle}> • Mínimo de 8 caracteres;</Text>
          <Text style={styles.subTitle}>
            {" "}
            • Pelo menos uma letra maiúscula.
          </Text>
          <Text style={styles.subTitle}>
            {" "}
            • Pelo menos um caractere especial (como !, @, #, $, etc.).
          </Text>
        </View>
        <InputComponent
          value=""
          place="Senha"
          image={<Lock color={Colors.ZINC200} size="20" strokeWidth={1} />}
          isPassword={true}
          height={50}
          width={335}
        />
        <InputComponent
          value=""
          place="Confirme sua senha"
          image={<Lock color={Colors.ZINC200} size="20" strokeWidth={1} />}
          isPassword={true}
          height={50}
          width={335}
        />
        <ButtonComponent text="SALVAR" color={Colors.MAIN} link="./" />
      </View>
    </View>
  );
};

export default Privacy;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.ZINC950,
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    paddingTop: 80,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.ZINC950,
  },
  loadingText: {
    color: Colors.ZINC400,
    fontFamily: "Inter_700Bold",
  },
  content: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  subTitle: {
    fontSize: 12,
    color: Colors.ZINC400,
    fontFamily: "Inter_700Bold",
  },
  text: {
    paddingTop: 20,
    marginHorizontal: 25,
    alignItems: "flex-start",
    paddingBottom: 10,
  },
});
