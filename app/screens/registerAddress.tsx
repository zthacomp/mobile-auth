import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ButtonComponent } from "@/components/button";
import { Colors } from "@/constants/Colors";
import { InputComponent } from "@/components/input";
import { AlignLeft } from "lucide-react-native";

const registerAddress = () => {
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
          place="Rua"
          image={<AlignLeft color={Colors.ZINC200} size="20" strokeWidth={1} />}
          isPassword={false}
          height={50}
          width={300}
        />
        <InputComponent
          value=""
          place="Número"
          image={<AlignLeft color={Colors.ZINC200} size="20" strokeWidth={1} />}
          isPassword={false}
          height={50}
          width={300}
        />
        <InputComponent
          value=""
          place="Bairro"
          image={<AlignLeft color={Colors.ZINC200} size="20" strokeWidth={1} />}
          isPassword={false}
          height={50}
          width={300}
        />
        <InputComponent
          value=""
          place="Cidade"
          image={<AlignLeft color={Colors.ZINC200} size="20" strokeWidth={1} />}
          isPassword={false}
          height={50}
          width={300}
        />
        <View style={styles.addressInfo}>
          <InputComponent
            value=""
            place="CEP"
            image={
              <AlignLeft color={Colors.ZINC200} size="20" strokeWidth={1} />
            }
            isPassword={false}
            height={50}
            width={180}
          />
          <InputComponent
            value=""
            place="UF"
            image={
              <AlignLeft color={Colors.ZINC200} size="20" strokeWidth={1} />
            }
            isPassword={false}
            height={50}
            width={110}
          />
        </View>
        <InputComponent
          value=""
          place="Complemento"
          image={<AlignLeft color={Colors.ZINC200} size="20" strokeWidth={1} />}
          isPassword={false}
          height={150}
          width={300}
        />
      </View>
      <View style={styles.button}>
        <ButtonComponent
          text="CONTINUAR"
          color={Colors.MAIN}
          link={"./email"}
        />
      </View>
    </View>
  );
};

export default registerAddress;

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
  addressInfo: { flexDirection: "row" },
});
