import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ButtonComponent } from "@/components/button";
import { Colors } from "@/constants/Colors";
import { InputComponent } from "@/components/input";
import { AtSign } from "lucide-react-native";

const email = () => {
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.text}>
          <Text style={styles.title}>Insira o seu E-mail</Text>
          <Text style={styles.subTitle}>
            O E-mail será utilizado para fins de verificação e
          </Text>
          <Text style={styles.subTitle}>segurança da sua conta.</Text>
        </View>

        <InputComponent
          value=""
          place="E-mail"
          image={<AtSign color={Colors.ZINC200} size="20" strokeWidth={1} />}
          isPassword={false}
          height={50}
          width={335}
        />
        <Text style={styles.subTitle2}>
          Será eviado um e-mail para verificação.
        </Text>
      </View>

      <View style={styles.button}>
        <ButtonComponent
          text="CONTINUAR"
          color={Colors.MAIN}
          link="./password"
        />
      </View>
    </View>
  );
};

export default email;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ZINC950,
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: { paddingLeft: 10, paddingTop: 50, paddingBottom: 20 },
  button: { paddingBottom: 30 },
  title: { fontSize: 25, color: Colors.ZINC200, fontFamily: "Inter_700Bold" },
  subTitle: {
    fontSize: 12,
    color: Colors.ZINC400,
    fontFamily: "Inter_700Bold",
  },
  subTitle2: {
    fontSize: 13,
    color: Colors.ZINC500,
    paddingLeft: 10,
    fontFamily: "Inter_400Regular",
  },
});
