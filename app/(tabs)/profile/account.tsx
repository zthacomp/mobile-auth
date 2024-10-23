import React, { useState, useContext, useEffect } from "react";
import { Modal, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { UserContext, UserContextType } from "@/app/context";
import { BackButtonComponent } from "@/components/backButton";
import { ButtonComponent } from "@/components/button";
import { ErrorStatus } from "@/components/errorStatus";
import { InputComponent } from "@/components/input";
import { SuccessStatus } from "@/components/successMessage";
import { Colors } from "@/constants/Colors";
import { updateUserAndPerson } from "@/src/services/userServices";
import dayjs from "dayjs";
import { Calendar, Captions, Phone, User, Users } from "lucide-react-native";
import { Dropdown } from "react-native-element-dropdown";
import { DayPicker } from "react-day-picker";

interface Data {
  name: string;
  cpf: string;
  birth: string;
  cellphone: string;
  gender: string;
}

interface GenderOption {
  label: string;
  value: string;
}

const genderData: GenderOption[] = [
  { label: "Homem cis", value: "MAN_CIS" },
  { label: "Mulher cis", value: "WOMAN_CIS" },
  { label: "Homem trans", value: "MAN_TRANS" },
  { label: "Mulher trans", value: "WOMAN_TRANS" },
  { label: "Não binário", value: "NON_BINARY" },
  { label: "Outro", value: "OTHER" },
  { label: "Prefiro não dizer", value: "PREFER_NOT_TO_SAY" },
];

const Account = () => {
  const { userInfo, token } = useContext(UserContext) as UserContextType;
  const [data, setData] = useState<Data>({
    name: userInfo?.person.name || "",
    cpf: userInfo?.cpf || "",
    birth: userInfo?.person.birth_date || "",
    cellphone: userInfo?.person.cellphone || "",
    gender: userInfo?.person.gender || "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [sucessMessage, setSucessMessage] = useState<string>("");
  const [selected, setSelected] = useState<Date>();
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const update = async () => {
    if (!userInfo || !userInfo.id) {
      setErrorMessage("Usuário não encontrado!");
      return;
    }

    if (!token) {
      setErrorMessage("Token é necessário");
      return;
    }

    try {
      const updatedData = {
        email: userInfo?.email || "",
        password: null,
        name: data.name || userInfo?.person.name || "",
        birth_date: dayjs(data.birth).format("YYYY-MM-DD") || "",
        cellphone: data.cellphone || userInfo?.person.cellphone || "",
        gender: data.gender || userInfo?.person.gender || "",
      };

      setIsLoading(true);
      await updateUserAndPerson(updatedData, userInfo.id, token);
      setSucessMessage("Dados atualizados com sucesso");
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setData({ ...data, birth: dayjs(date).format("DD/MM/YYYY") });
      setSelected(date);
    }
    setModalVisible(false);
  };

  useEffect(() => {
    if (userInfo) {
      setData({
        name: userInfo.person.name || "",
        cpf: userInfo.cpf || "",
        birth: dayjs(data.birth).format("DD/MM/YYYY") || "",
        cellphone: userInfo.person.cellphone || "",
        gender: userInfo.person.gender || "",
      });
    }
  }, [userInfo]);

  return (
    <View style={styles.container}>
      <BackButtonComponent text="Minha conta" link="../profile" />
      <View style={styles.content}>
        <InputComponent
          value={data.name}
          onChangeText={(value) => setData({ ...data, name: value })}
          place="Nome completo"
          image={<User color={Colors.ZINC200} size="20" strokeWidth={1} />}
          isPassword={false}
          height={50}
          width={335}
          editable={true}
        />
        <InputComponent
          value={data.cpf}
          onChangeText={(value) => setData({ ...data, cpf: value })}
          place="CPF"
          image={<Captions color={Colors.ZINC200} size="20" strokeWidth={1} />}
          isPassword={false}
          height={50}
          width={335}
          editable={false}
        />
        <TouchableOpacity onPress={openModal}>
          <InputComponent
            value={data.birth}
            onChangeText={() => {}}
            place="Data de nascimento"
            image={
              <Calendar color={Colors.ZINC200} size="20" strokeWidth={1} />
            }
            isPassword={false}
            height={50}
            width={335}
            editable={false}
          />
        </TouchableOpacity>

        <InputComponent
          value={data.cellphone}
          onChangeText={(value) => setData({ ...data, cellphone: value })}
          place="Celular"
          image={<Phone color={Colors.ZINC200} size="20" strokeWidth={1} />}
          isPassword={false}
          height={50}
          width={335}
          editable={true}
        />

        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          containerStyle={styles.containerStyle}
          itemTextStyle={styles.itemTextStyle}
          data={genderData}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Gênero"
          value={data.gender}
          onChange={(item) => {
            setData({ ...data, gender: item.value });
          }}
        />

        {sucessMessage ? <SuccessStatus text={sucessMessage} /> : null}
        {errorMessage ? <ErrorStatus text={errorMessage} /> : null}
        <ButtonComponent
          text="SALVAR"
          color={Colors.MAIN}
          onPress={update}
          disabled={false}
        />
      </View>

      <Modal transparent={true} visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Selecione a Data de Nascimento
            </Text>
            <DayPicker
              hideNavigation
              captionLayout="dropdown"
              mode="single"
              selected={selected}
              onSelect={handleDateSelect}
            />
            <ButtonComponent
              text="FECHAR"
              color={Colors.MAIN}
              onPress={() => setModalVisible(false)}
              disabled={false}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.ZINC950,
    flex: 1,
    alignItems: "center",
  },
  content: {
    marginTop: 120,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: Colors.ZINC900,
    padding: 20,
    borderRadius: 10,
    width: 360,
    alignItems: "center",
  },
  modalTitle: {
    color: Colors.ZINC200,
    fontSize: 20,
    marginBottom: 20,
    fontFamily: "Inter_500Medium",
  },
  dropdown: {
    height: 50,
    borderColor: Colors.ZINC900,
    backgroundColor: Colors.ZINC900,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    width: 335,
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily: "Inter_500Medium",
    color: Colors.ZINC500,
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: "Inter_500Medium",
    color: Colors.ZINC200,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  containerStyle: {
    backgroundColor: Colors.ZINC900,
    borderColor: Colors.ZINC900,
    borderRadius: 10,
  },
  itemTextStyle: {
    fontSize: 16,
    fontFamily: "Inter_500Medium",
    color: Colors.ZINC200,
  },
});
