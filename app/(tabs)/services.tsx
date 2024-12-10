import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { LinkedServices } from "@/components/linkedServices";
import { getServiceUsers } from "@/src/services/userServices";
import { UserContext, UserContextType } from "../context";
import { ErrorStatus } from "@/components/errorStatus";
import { format } from "date-fns";
import { disconnectUserService } from "@/src/services/serviceServices";

interface servicesData {
  id: string;
  title: string;
  starts_at: Date;
  last_access_at: Date;
  ends_at: Date;
}

const services = () => {
  const { userInfo, token } = useContext(UserContext) as UserContextType;
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [data, setData] = useState<servicesData[]>([]);

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
      setData(response.data.services);
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    }
  };

  const disconnectService = async (serviceId: string) => {
    if (!userInfo || !userInfo.id) {
      setErrorMessage("Usuário não encontrado!");
      return;
    }

    if (!serviceId) {
      setErrorMessage("Id do serviço é necessário");
      return;
    }

    if (!token) {
      setErrorMessage("Token é necessário");
      return;
    }

    try {
      await disconnectUserService(
        { user_id: userInfo.id, service_id: serviceId },
        token,
      );
      getServices();
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    getServices();
  }, [data]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Servicos vinculados</Text>
      <View style={styles.content}>
        {data.length > 0 ? (
          data.map((service: servicesData, index) => (
            <LinkedServices
              key={index}
              id={service.id}
              title={service.title}
              image={require("../../assets/images/Logo.png")}
              inscription={format(new Date(service.starts_at), "dd/MM/yyyy")}
              access={format(new Date(service.last_access_at), "dd/MM/yyyy")}
              time={format(new Date(service.last_access_at), "HH:mm")}
              onDisconnect={() => disconnectService(service.id)}
              end={format(new Date(service.ends_at), "dd/MM/yyyy")}
            />
          ))
        ) : (
          <View style={styles.message}>
            <Text style={styles.subTitle}>
              Nenhum serviço vinculado com esse usuário
            </Text>
          </View>
        )}
        {errorMessage ? <ErrorStatus text={errorMessage} /> : null}
      </View>
    </View>
  );
};

export default services;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ZINC950,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: "5%",
  },
  content: {
    flex: 1,
    width: "100%",
  },
  text: {
    color: Colors.ZINC200,
    fontSize: 25,
    fontFamily: "Inter_700Bold",
    paddingTop: "15%",
    paddingBottom: "5%",
  },
  message: {
    backgroundColor: Colors.ZINC900,
    borderRadius: 10,
  },
  subTitle: {
    textAlign: "center",
    color: Colors.ZINC200,
    fontSize: 15,
    padding: 10,
    fontFamily: "Inter_500Medium",
  },
});
