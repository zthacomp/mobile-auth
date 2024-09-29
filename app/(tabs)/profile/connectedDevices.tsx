import { BackButtonComponent } from "@/components/backButton";
import { Devices } from "@/components/devicesComponents";
import { Colors } from "@/constants/Colors";
import { StyleSheet, View } from "react-native";

const connectedDevices = () => {
  return (
    <View style={styles.container}>
      <BackButtonComponent text="Dispositivos conectados" link="../profile" />
      <View style={styles.content}>
        <Devices
          id="FNJDN&6YD9ASdJFJSDNJFDS8946"
          ipAddress="127.0.0.1"
          location="Serrinha"
          createAt="29/09/2024"
          updateAt="29/09/2024"
        />
      </View>
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
});
