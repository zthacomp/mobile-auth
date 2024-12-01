import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, Alert } from "react-native";
import { Colors } from "@/constants/Colors";
import { SettingsComponent } from "@/components/settingsComponent";
import { useCameraPermissions, PermissionStatus } from "expo-camera";
import { UserContext, UserContextType } from "../context";

const settings = () => {
  const { setCameraPermission } = useContext(UserContext) as UserContextType;
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [cameraAccessGranted, setCameraAccessGranted] =
    useState<boolean>(false);

  const handleCameraPermission = async () => {
    if (cameraPermission?.status === PermissionStatus.GRANTED) {
      Alert.alert(
        "Permissão já concedida",
        "Para revogar o acesso, altere as permissões nas configurações do sistema.",
      );
    } else {
      const { granted } = await requestCameraPermission();
      setCameraAccessGranted(granted);
    }
  };

  useEffect(() => {
    setCameraAccessGranted(
      cameraPermission?.status === PermissionStatus.GRANTED,
    );
    if (cameraPermission) {
      setCameraPermission(true);
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
