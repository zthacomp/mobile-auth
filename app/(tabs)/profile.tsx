import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { BackButtonComponent } from "@/components/backButton";
import { ProfileButtonComponent } from "@/components/profileButtonComponent";
import {
  Headset,
  Lock,
  LogOut,
  MapPin,
  MonitorSmartphone,
  UserCog,
} from "lucide-react-native";
import { LogoutComponent } from "@/components/logout";
import { EmailButton } from "@/components/emailButton";

const profile = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <BackButtonComponent text="Perfil" link="./home" />
        <View style={styles.user}>
          <Image
            style={styles.icon}
            source={require("@/assets/images/Logo.png")}
          />
          <Text style={styles.userName}>User name</Text>
          <Text style={styles.email}>joaosilva@email.com</Text>
        </View>
        <ProfileButtonComponent
          text="Minha conta"
          image={<UserCog color={Colors.MAIN} strokeWidth={1} />}
          link="../profile/account"
        />
        <ProfileButtonComponent
          text="Endereço"
          image={<MapPin color={Colors.MAIN} strokeWidth={1} />}
          link="../profile/address"
        />
        <ProfileButtonComponent
          text="Privacidade"
          image={<Lock color={Colors.MAIN} strokeWidth={1} />}
          link="../profile/privacy"
        />
        <ProfileButtonComponent
          text="Dispositivos conectados"
          image={<MonitorSmartphone color={Colors.MAIN} strokeWidth={1} />}
          link="../profile/connectedDevices"
        />
        <ProfileButtonComponent
          text="Suporte"
          image={<Headset color={Colors.MAIN} strokeWidth={1} />}
          link="../profile/support"
        />
        <LogoutComponent
          text="Logout"
          image={<LogOut color={Colors.RED} strokeWidth={1} />}
          link="../../screens/user/login"
        />
      </ScrollView>
    </View>
  );
};

export default profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ZINC950,
  },
  scrollContainer: {
    paddingBottom: 210,
    alignItems: "center",
    justifyContent: "center",
  },
  user: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "55%",
    marginBottom: 20,
  },
  icon: {
    height: 80,
    width: 80,
    borderRadius: 50,
  },
  userName: {
    color: Colors.ZINC200,
    fontSize: 18,
    fontFamily: "Inter_500Medium",
    margin: 10,
  },
  email: {
    borderRadius: 5,
    paddingVertical: "1%",
    paddingHorizontal: "5%",
    backgroundColor: "#13312e",
    color: Colors.ZINC200,
    fontSize: 13,
    fontFamily: "Inter_500Medium",
  },
});
