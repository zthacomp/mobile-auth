import { UserContext, UserContextType } from "@/app/context";
import { ErrorStatus } from "@/components/errorStatus";
import { ServicesCode } from "@/components/servicesCode";
import { getServiceUsers } from "@/src/services/userServices";
import { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

interface servicesData {
  id: string;
  title: string;
  starts_at: Date;
  last_access_at: Date;
  ends_at: Date;
}

const autheticaorServices = () => {
  const { userInfo, token } = useContext(UserContext) as UserContextType;
  const [services, setServices] = useState<servicesData[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const getServices = async () => {
    if (!userInfo || !userInfo.id) {
      setErrorMessage("Usuário não encontrado!");
      return;
    }

    if (!token) {
      setErrorMessage("Token é necessário");
      return;
    }

    try {
      const response = await getServiceUsers(userInfo.id, token);
      setServices(response.data.services);
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <View>
      //salvar o scret dento de cada service e envair na hora de gerar
      <Text>
        {services.length > 0 ? (
          services.map((service: servicesData, index) => (
            <ServicesCode title={service.title} link="/" />
          ))
        ) : (
          <View style={styles.message}>
            <Text style={styles.subTitle}>
              Nenhum serviço vinculado com esse usuário
            </Text>
          </View>
        )}
        {errorMessage ? <ErrorStatus text={errorMessage} /> : null}
      </Text>
    </View>
  );
};

export default autheticaorServices;

const styles = StyleSheet.create({ message: {}, subTitle: {} });
