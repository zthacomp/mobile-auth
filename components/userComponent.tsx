import { UserContext, UserContextType } from "@/app/context";
import { Colors } from "@/constants/Colors";
import { jwtDecode } from "jwt-decode";
import { useContext, useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface TokenPayload {
  id: string;
  name: string;
  email: string;
  cpf: string;
  role: string;
  is_active: boolean;
  is_verified: boolean;
  created_at: Date;
  updated_at: Date;
}

export const UserComponent = () => {
  const { token } = useContext(UserContext) as UserContextType;
  const [userInfo, setUserInfo] = useState<TokenPayload | null>(null);

  useEffect(() => {
    if (token) {
      try {
        const decoded: TokenPayload = jwtDecode(token);
        setUserInfo(decoded);
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
      }
    }
  }, [token]);

  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.name}>{userInfo?.name}</Text>
      </View>
      <Image
        style={styles.icon}
        source={require("@/assets/images/Logo.png")}
      ></Image>
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
    paddingBottom: 10,
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
