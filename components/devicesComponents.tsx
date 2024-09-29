import { Colors } from "@/constants/Colors";
import { Smartphone } from "lucide-react-native";
import { View, StyleSheet, Text } from "react-native";

interface devicesProps {
  id: string;
  ipAddress: string;
  location: string;
  createAt: string;
  updateAt: string;
}

export const Devices: React.FC<devicesProps> = ({
  id,
  ipAddress,
  location,
  createAt,
  updateAt,
}) => {
  return (
    <View style={styles.container}>
      <Smartphone color={Colors.MAIN} />
      <View style={styles.content}>
        <Text style={styles.text}>ID: {id}</Text>
        <Text style={styles.text}>IP: {ipAddress}</Text>
        <Text style={styles.text}>Localização: {location}</Text>
        <Text style={styles.text}>Criado: {createAt}</Text>
        <Text style={styles.text}>Atualizado: {updateAt}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.ZINC900,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
  },
  content: { justifyContent: "center", alignItems: "center" },
  text: {
    color: Colors.ZINC200,
    fontFamily: "Inter_500Medium",
    padding: 5,
  },
});
