import { BackButtonComponent } from "@/components/backButton";
import { ButtonComponent } from "@/components/button";
import { InputComponent } from "@/components/input";
import { Colors } from "@/constants/Colors";
import { AlignLeft } from "lucide-react-native";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const address = () => {
  return (
    <View style={styles.container}>
      <BackButtonComponent text="Endereço" link="../profile" />
      <View style={styles.content}>
        <ScrollView>
          <InputComponent
            value=""
            place="Rua"
            image={
              <AlignLeft color={Colors.ZINC200} size="20" strokeWidth={1} />
            }
            isPassword={false}
            height={50}
            width={335}
          />
          <InputComponent
            value=""
            place="Número"
            image={
              <AlignLeft color={Colors.ZINC200} size="20" strokeWidth={1} />
            }
            isPassword={false}
            height={50}
            width={335}
          />
          <InputComponent
            value=""
            place="Bairro"
            image={
              <AlignLeft color={Colors.ZINC200} size="20" strokeWidth={1} />
            }
            isPassword={false}
            height={50}
            width={335}
          />
          <InputComponent
            value=""
            place="Cidade"
            image={
              <AlignLeft color={Colors.ZINC200} size="20" strokeWidth={1} />
            }
            isPassword={false}
            height={50}
            width={335}
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
              width={210}
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
            image={
              <AlignLeft color={Colors.ZINC200} size="20" strokeWidth={1} />
            }
            isPassword={false}
            height={150}
            width={335}
          />

          <ButtonComponent text="SALVAR" color={Colors.MAIN} link={"./"} />
        </ScrollView>
      </View>
    </View>
  );
};

export default address;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.ZINC950,
    flex: 1,
    alignItems: "center",
  },
  content: {
    marginTop: 120,
  },
  addressInfo: { flexDirection: "row" },
});
