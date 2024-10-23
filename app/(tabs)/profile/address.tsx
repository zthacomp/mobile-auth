import { UserContext, UserContextType } from "@/app/context";
import { BackButtonComponent } from "@/components/backButton";
import { ButtonComponent } from "@/components/button";
import { ErrorStatus } from "@/components/errorStatus";
import { InputComponent } from "@/components/input";
import { SuccessStatus } from "@/components/successMessage";
import { Colors } from "@/constants/Colors";
import { AlignLeft } from "lucide-react-native";
import { useContext, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

interface Data {
  name: string;
  cpf: string;
  birth: string;
  cellphone: string;
}

const address = () => {
  const { userInfo, token } = useContext(UserContext) as UserContextType;
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [sucessMessage, setSucessMessage] = useState<string>("");
  // const [data, setData] = useState<Data>({

  // });

  const update = async () => {
    try {
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <BackButtonComponent text="Endereço" link="../profile" />
        <View style={styles.content}>
          <InputComponent
            value=""
            onChangeText={update}
            place="Rua"
            image={
              <AlignLeft color={Colors.ZINC200} size="20" strokeWidth={1} />
            }
            isPassword={false}
            height={50}
            width={335}
            editable={true}
          />
          <InputComponent
            value=""
            onChangeText={update}
            place="Número"
            image={
              <AlignLeft color={Colors.ZINC200} size="20" strokeWidth={1} />
            }
            isPassword={false}
            height={50}
            width={335}
            editable={true}
          />
          <InputComponent
            value=""
            onChangeText={update}
            place="Bairro"
            image={
              <AlignLeft color={Colors.ZINC200} size="20" strokeWidth={1} />
            }
            isPassword={false}
            height={50}
            width={335}
            editable={true}
          />
          <InputComponent
            value=""
            onChangeText={update}
            place="Cidade"
            image={
              <AlignLeft color={Colors.ZINC200} size="20" strokeWidth={1} />
            }
            isPassword={false}
            height={50}
            width={335}
            editable={true}
          />
          <View style={styles.addressInfo}>
            <InputComponent
              value=""
              onChangeText={update}
              place="CEP"
              image={
                <AlignLeft color={Colors.ZINC200} size="20" strokeWidth={1} />
              }
              isPassword={false}
              height={50}
              width={210}
              editable={true}
            />
            <InputComponent
              value=""
              onChangeText={update}
              place="UF"
              image={
                <AlignLeft color={Colors.ZINC200} size="20" strokeWidth={1} />
              }
              isPassword={false}
              height={50}
              width={110}
              editable={true}
            />
          </View>
          <InputComponent
            value=""
            onChangeText={update}
            place="Complemento"
            image={
              <AlignLeft color={Colors.ZINC200} size="20" strokeWidth={1} />
            }
            isPassword={false}
            height={150}
            width={335}
            editable={true}
          />
          {errorMessage ? <SuccessStatus text={sucessMessage} /> : null}
          {errorMessage ? <ErrorStatus text={errorMessage} /> : null}
          <ButtonComponent
            text="SALVAR"
            color={Colors.MAIN}
            onPress={update}
            disabled={true}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default address;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.ZINC950,
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  content: {
    flex: 1,
    marginTop: 120,
  },
  scroll: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  addressInfo: {
    flexDirection: "row",
  },
});
