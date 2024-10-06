import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { SettingsComponent } from "@/components/settingsComponent";

const settings = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.text}>Configurações</Text>
        <Text style={styles.functions}>Permissões</Text>
        <View style={styles.content}>
          <SettingsComponent text="Acesso à câmera" />
          <SettingsComponent text="Acesso ao app por biometria" />
        </View>
        <Text style={styles.functions}>Notificações</Text>
        <View style={styles.content}>
          <SettingsComponent text="Logins realizados" />
          <SettingsComponent text="Serviços vinculados" />
          <SettingsComponent text="Dispositivos conectados" />
          <SettingsComponent text="Atualizações de perfil" />
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
