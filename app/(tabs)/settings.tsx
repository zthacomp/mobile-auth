import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { SettingsComponent } from "@/components/settingsComponent";
import { useCameraPermissions, PermissionStatus } from "expo-camera";

const settings = () => {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [cameraAccessGranted, setCameraAccessGranted] =
    useState<boolean>(false);
  const [per, setPer] = useState<boolean>(false);

  const handleCameraPermission = async () => {
    if (cameraPermission?.status === PermissionStatus.GRANTED) {
      setCameraAccessGranted(false);
    } else {
      const { granted } = await requestCameraPermission();
      setCameraAccessGranted(granted);
    }
  };

  const ok = () => {
    setPer(!per);
  };

  useEffect(() => {
    if (cameraPermission?.status === PermissionStatus.GRANTED) {
      setCameraAccessGranted(true);
    } else {
      setCameraAccessGranted(false);
    }
  }, [cameraPermission]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.text}>Configurações</Text>
        <Text style={styles.functions}>Permissões</Text>
        <View style={styles.content}>
          <SettingsComponent
            text="Acesso à câmera"
            response={cameraAccessGranted}
            onPress={handleCameraPermission}
          />

          <SettingsComponent
            text="Acesso ao app por biometria"
            response={cameraAccessGranted}
            onPress={ok}
          />
        </View>
        <Text style={styles.functions}>Notificações</Text>
        <View style={styles.content}>
          <SettingsComponent
            text="Logins realizados"
            response={cameraAccessGranted}
            onPress={ok}
          />
          <SettingsComponent
            text="Serviços vinculados"
            response={cameraAccessGranted}
            onPress={ok}
          />
          <SettingsComponent
            text="Dispositivos conectados"
            response={cameraAccessGranted}
            onPress={ok}
          />
          <SettingsComponent
            text="Atualizações de perfil"
            response={cameraAccessGranted}
            onPress={ok}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ZINC950,
    padding: "5%",
  },
  scrollContainer: {
    paddingBottom: 60,
    width: "100%",
  },
  content: {
    width: "100%",
  },
  text: {
    color: Colors.ZINC200,
    fontSize: 25,
    fontFamily: "Inter_700Bold",
    paddingTop: "15%",
    paddingBottom: "5%",
  },
  functions: {
    color: Colors.ZINC200,
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    paddingTop: "10%",
    paddingLeft: "2%",
    paddingBottom: "5%",
  },
});
