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
  // updateAt: string;
  onDelete: () => void;
}

export const Devices: React.FC<devicesProps> = ({
  id,
  ipAddress,
  location,
  createAt,
  // updateAt,
  onDelete,
}) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleDisconnect = () => {
    onDelete();
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Smartphone color={Colors.MAIN} size={44} strokeWidth={1.25} />
      <View style={styles.content}>
        <View style={styles.decicesInfo}>
          <Text style={styles.text}>{location}</Text>
          <Pressable style={styles.close} onPress={() => setModalVisible(true)}>
            <X color={Colors.ZINC400} size={20} />
          </Pressable>
        </View>

        <View style={styles.decicesInfo}>
          <Text style={styles.text}>{ipAddress}</Text>
          <Text style={styles.text}>
            {format(new Date(createAt), "dd/MM/yyyy")}
          </Text>
          {/* <Text style={styles.text}>
          Atualizado: {format(new Date(updateAt), "dd/MM/yyyy")}
        </Text> */}
        </View>
      </View>

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
    backgroundColor: Colors.ZINC900,
    borderRadius: 10,
    padding: 20,
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  content: {
    display: "flex",
    gap: 4,
    marginVertical: 6,
    justifyContent: "flex-start",
  },
  text: {
    color: Colors.ZINC400,
    fontFamily: "Inter_500Medium",
  },
  close: {},
  decicesInfo: {
    display: "flex",
    paddingLeft: 10,
    paddingRight: 0,
    gap: 64,
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
