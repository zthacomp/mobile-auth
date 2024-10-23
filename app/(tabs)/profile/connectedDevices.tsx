import { UserContext, UserContextType } from "@/app/context";
import { BackButtonComponent } from "@/components/backButton";
import { Devices } from "@/components/devicesComponents";
import { ErrorStatus } from "@/components/errorStatus";
import { Colors } from "@/constants/Colors";
import { getUserTrustedDevices } from "@/src/services/deviceServices";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

interface DevicesData {
  id: string;
  ip_address: string;
  location: string;
  created_at: string;
  updated_at: string;
}

const connectedDevices = () => {
  const { userInfo, token } = useContext(UserContext) as UserContextType;
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [data, setData] = useState<DevicesData[]>([]);

  const findDevices = async () => {
    if (!userInfo || !userInfo.id) {
      setErrorMessage("Usuário não encontrado!");
      return;
    }

    if (!token) {
      setErrorMessage("Token é necessário");
      return;
    }

    try {
      const response = await getUserTrustedDevices(userInfo.id, token);
      setData(response.data);
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    findDevices();
  }, []);

  return (
    <View style={styles.container}>
      <BackButtonComponent text="Dispositivos conectados" link="../profile" />
      <View style={styles.content}>
        {data.length > 0 ? (
          data.map((device) => (
            <Devices
              key={device.id}
              id={device.id}
              ipAddress={device.ip_address}
              location={device.location}
              createAt={device.created_at}
              updateAt={device.updated_at}
            />
          ))
        ) : (
          <View style={styles.message}>
            <Text style={styles.subTitle}>
              Nenhum dispositivo vinculado com esse usuário
            </Text>
          </View>
        )}
      </View>
      {errorMessage ? <ErrorStatus text={errorMessage} /> : null}
    </View>
  );
};

export default connectedDevices;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.ZINC950,
    flex: 1,
    alignItems: "center",
  },
  content: {
    marginTop: 120,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
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
