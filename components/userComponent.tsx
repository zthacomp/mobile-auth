import { UserContext, UserContextType } from "@/app/context";
import { Colors } from "@/constants/Colors";
import { useContext, useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export const UserComponent = () => {
  const { userInfo } = useContext(UserContext) as UserContextType;

  const [firstName, secondName] = userInfo?.person.name?.split(" ") || [];
  const displayName = `${firstName || "Usuário"} ${secondName || ""}`.trim();

  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.name}>{displayName}</Text>
      </View>
      <Image
        style={styles.icon}
        source={{
          uri: userInfo?.person.profile_photo_url || "@/assets/images/Logo.png",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 30,
    paddingTop: 60,
  },
  greeting: {
    color: Colors.ZINC200,
    fontSize: 15,
    fontFamily: "Inter_500Medium",
  },
  name: {
    color: Colors.ZINC200,
    fontSize: 25,
    fontFamily: "Inter_700Bold",
  },
  icon: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
});
