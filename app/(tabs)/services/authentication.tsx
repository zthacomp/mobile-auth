import React, { useContext, useEffect, useState } from "react"; // Add React import
import { UserContext, UserContextType } from "@/app/context";
import { UserComponent } from "@/components/userComponent";
import { Colors } from "@/constants/Colors";
import { Copy } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TOTP } from "totp-generator";
import { Link } from "expo-router";

const Authentication = () => {
  const { secret } = useContext(UserContext) as UserContextType;
  const [token, setToken] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);

  const updateCode = () => {
    if (secret) {
      const { otp } = TOTP.generate(secret);
      setToken(otp);
    }
  };

  useEffect(() => {
    updateCode();

    const interval = setInterval(() => {
      updateCode();
      setTimeLeft(30);
    }, 30000);

    return () => clearInterval(interval);
  }, [secret]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      console.log(secret);
      console.log(token);
    }, 1000);

    return () => clearInterval(timer);
  }, [token]);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <UserComponent />
      </View>
      <View style={styles.innerContainer}>
        {token === "" ? (
          <Link href="/(tabs)/services/qrCode" style={styles.subText}>
            Clique aqui e escaneie o QR code para liberar o código de acesso
          </Link>
        ) : (
          <>
            <Text style={styles.text}>Código de acesso</Text>
            <View style={styles.code}>
              <Text
                style={{
                  color: Colors.ZINC200,
                  fontSize: 30,
                  fontFamily: "Inter_700Bold",
                  paddingRight: 10,
                }}
              >
                {token}
              </Text>
              <Copy color={Colors.MAIN} size={35} strokeWidth={1} />
            </View>
            <Text style={styles.text}>Tempo restante {timeLeft}s</Text>
          </>
        )}
      </View>
    </View>
  );
};

export default Authentication;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ZINC950,
  },
  topContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  code: {
    backgroundColor: Colors.ZINC900,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 10,
    padding: 10,
    width: "90%",
    height: "15%",
  },
  text: {
    color: Colors.ZINC200,
    fontSize: 13,
    marginVertical: 10,
    fontFamily: "Inter_400Regular",
  },
  subText: {
    textAlign: "center",
    color: Colors.ZINC200,
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    paddingRight: 10,
    margin: 20,
    textDecorationLine: "underline",
  },
});
