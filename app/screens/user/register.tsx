import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ButtonComponent } from "@/components/button";
import { Colors } from "@/constants/Colors";
import { InputComponent } from "@/components/input";
import { Calendar, Captions, Phone, User } from "lucide-react-native";

const register = () => {
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.text}>
          <Text style={styles.title}>Pessoa física</Text>
          <Text style={styles.subTitle}>
            Preencha suas informações pessoais.
          </Text>
        </View>

        <InputComponent
          value=""
          place="Nome completo"
          image={<User color={Colors.ZINC200} size="20" strokeWidth={1} />}
          isPassword={false}
          height={50}
          width={335}
        />
        <InputComponent
          value=""
          place="CPF"
          image={<Captions color={Colors.ZINC200} size="20" strokeWidth={1} />}
          isPassword={false}
          height={50}
          width={335}
        />
        <InputComponent
          value=""
          place="RG"
          image={<Captions color={Colors.ZINC200} size="20" strokeWidth={1} />}
          isPassword={false}
          height={50}
          width={335}
        />
        <InputComponent
          value=""
          place="Data de nascimento"
          image={<Calendar color={Colors.ZINC200} size="20" strokeWidth={1} />}
          isPassword={false}
          height={50}
          width={335}
        />
        <InputComponent
          value=""
          place="Celular"
          image={<Phone color={Colors.ZINC200} size="20" strokeWidth={1} />}
          isPassword={false}
          height={50}
          width={335}
        />
      </View>

      <View style={styles.button}>
        <ButtonComponent
          text="CONTINUAR"
          color={Colors.MAIN}
          link="./registerAddress"
        />
      </View>
    </View>
  );
};

export default register;

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
    fontFamily: "Inter_700Bold",
  },
  subTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    color: Colors.ZINC400,
  },
});
