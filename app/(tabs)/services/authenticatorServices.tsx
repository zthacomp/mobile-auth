import { UserContext, UserContextType } from "@/app/context";
import { ErrorStatus } from "@/components/errorStatus";
import { ServicesCode } from "@/components/servicesCode";
import { UserComponent } from "@/components/userComponent";
import { Colors } from "@/constants/Colors";
import { getServiceUsersInfo } from "@/src/services/serviceServices";
import { getServiceUsers } from "@/src/services/userServices";
import { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

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
  const [secret, setSecret] = useState<string[]>([]);

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

      const tfaPromises = response.data.services.map(
        async (service: servicesData) => {
          const tfaResponse = await getServiceUsersInfo(
            userInfo.id,
            service.id,
            token,
          );
          return tfaResponse.data.tfa_secret;
        },
      );

      const tfaSecrets = await Promise.all(tfaPromises);
      setSecret(tfaSecrets);
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message || "Erro ao buscar serviços",
      );
    }
  };

  useEffect(() => {
    getServices();
  }, [services, secret]);

  return (
    <View style={styles.container}>
      <UserComponent />
      <View style={styles.textArea}>
        <Text style={styles.text}>Códigos de autenticação</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          {services.length > 0 ? (
            services.map((service: servicesData, index) => (
              <ServicesCode
                key={service.id}
                title={service.title}
                image={require("../../../assets/images/Logo.png")}
                secret={secret[index]}
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
      </ScrollView>
    </View>
  );
};

export default autheticaorServices;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ZINC950,
  },
  content: {
    justifyContent: "center",
  },
  scrollContainer: {
    justifyContent: "center",
    paddingBottom: "100%",
    marginHorizontal: "5%",
    marginVertical: "10%",
  },
  textArea: {
    alignItems: "center",
    justifyContent: "center",
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
  text: {
    color: Colors.WHITE,
    fontFamily: "Inter_500Medium",
    fontSize: 18,
    marginTop: 30,
  },
});
