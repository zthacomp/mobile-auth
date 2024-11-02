import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { Smartphone, X } from "lucide-react-native";
import { View, StyleSheet, Text, Pressable, Modal } from "react-native";
import { format } from "date-fns";
import { CloseModal } from "./closeModal";

interface devicesProps {
  id: string;
  ipAddress: string;
  location: string;
  createAt: string;
  updateAt: string;
  onDelete: () => void;
}

export const Devices: React.FC<devicesProps> = ({
  id,
  ipAddress,
  location,
  createAt,
  updateAt,
  onDelete,
}) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleDisconnect = () => {
    onDelete();
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Smartphone color={Colors.MAIN} />
      <View style={styles.content}>
        <Text style={styles.text}>IP: {ipAddress}</Text>
        <Text style={styles.text}>Localização: {location}</Text>
        <Text style={styles.text}>
          Criado: {format(new Date(createAt), "dd/MM/yyyy")}
        </Text>
        <Text style={styles.text}>
          Atualizado: {format(new Date(updateAt), "dd/MM/yyyy")}
        </Text>
      </View>
      <Pressable style={styles.close} onPress={() => setModalVisible(true)}>
        <X color={Colors.ZINC400} size={18} />
      </Pressable>

      <CloseModal
        id={id}
        ipAddress={ipAddress}
        text="Deseja desconectar este dispositivo?"
        visible={modalVisible}
        onDisconnect={handleDisconnect}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: Colors.ZINC900,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    width: 300,
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  text: {
    color: Colors.ZINC200,
    fontFamily: "Inter_500Medium",
  },
  close: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
