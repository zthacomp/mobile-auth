import { Colors } from "@/constants/Colors";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

interface CloseModalProps {
  id: string;
  ipAddress: string;
  text: string;
  visible: boolean;
  onDisconnect: () => void;
  onClose: () => void;
}

export const CloseModal: React.FC<CloseModalProps> = ({
  id,
  ipAddress,
  text,
  visible,
  onDisconnect,
  onClose,
}) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{text}</Text>
          <Text style={styles.modalText}>{ipAddress}</Text>
          <View style={styles.modalButtons}>
            <Pressable style={styles.modalButton} onPress={onDisconnect}>
              <Text style={styles.modalButtonText}>Sim</Text>
            </Pressable>
            <Pressable style={styles.modalButton} onPress={onClose}>
              <Text style={styles.modalButtonText}>Não</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: Colors.ZINC900,
    padding: 20,
    borderRadius: 15,
    width: 300,
    alignItems: "center",
    zIndex: 10,
  },
  modalText: {
    color: Colors.ZINC200,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    backgroundColor: Colors.MAIN,
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  modalButtonText: {
    color: Colors.ZINC200,
    fontFamily: "Inter_500Medium",
  },
});
