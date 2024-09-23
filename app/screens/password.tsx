import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ButtonComponent } from "@/components/button";
import { Colors } from "@/constants/Colors";
import { InputComponent } from "@/components/input";
import { Lock } from "lucide-react-native";

const password = () => {
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.text}>
          <Text style={styles.title}>Insira uma senha</Text>
          <Text style={styles.subTitle}>
            Para garantir a segurança dos seus dados, :
          </Text>
          <Text style={styles.subTitle}>sua senha deve ter</Text>
          <Text style={styles.subTitle}> Mínimo de 8 caracteres;</Text>
          <Text style={styles.subTitle}> Pelo menos uma letra maiúscula.</Text>
          <Text style={styles.subTitle}>
            {" "}
            Pelo menos um caractere especial (como !, @, #,
          </Text>
          <Text style={styles.subTitle}> $, etc.).</Text>
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
      </View>

      <View style={styles.button}>
        <ButtonComponent
          text="CONTINUAR"
          color={Colors.MAIN}
          link="../(tabs)/home"
        />
      </View>
    </View>
  );
};

export default password;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ZINC950,
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: { paddingLeft: 10, paddingTop: 50, paddingBottom: 20 },
  button: { paddingBottom: 30 },
  title: {
    fontSize: 25,
    color: Colors.ZINC200,
  },
  subTitle: {
    fontSize: 13,
    color: Colors.ZINC400,
  },
  subTitle2: {
    fontSize: 13,
    color: Colors.ZINC500,
    paddingLeft: 10,
  },
});
