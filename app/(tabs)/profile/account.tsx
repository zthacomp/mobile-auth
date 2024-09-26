import { BackButtonComponent } from "@/components/backButton";
import { ButtonComponent } from "@/components/button";
import { InputComponent } from "@/components/input";
import { Colors } from "@/constants/Colors";
import { Calendar, Captions, Phone, User } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

const account = () => {
  return (
    <View style={styles.container}>
      <BackButtonComponent text="Minha conta" link="../profile" />
      <View style={styles.content}>
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
        <ButtonComponent text="SALVAR" color={Colors.MAIN} link={"./"} />
      </View>
    </View>
  );
};

export default account;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.ZINC950,
    flex: 1,
    alignItems: "center",
  },
  content: {
    marginTop: 120,
  },
});
