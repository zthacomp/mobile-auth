import React, { useEffect, useState } from "react";
import { UserComponent } from "@/components/userComponent";
import { Colors } from "@/constants/Colors";
import { Copy } from "lucide-react-native";
import { StyleSheet, Text, View, Pressable } from "react-native";
import * as Clipboard from "expo-clipboard";
import { TOTP } from "totp-generator";
import { Link } from "expo-router";
import { useRoute } from "@react-navigation/native";

const Authentication = () => {
  const [token, setToken] = useState("");

  const router = useRoute();

  const { secret } = router.params as { secret: string };

  const updateCode = () => {
    if (secret) {
      const { otp } = TOTP.generate(secret, { period: 30 });
      setToken(otp);
    }
  };

  const copyToClipboard = async () => {
    if (token) {
      await Clipboard.setStringAsync(token);
    }
  };

  useEffect(() => {
    updateCode();

    const interval = setInterval(() => {
      updateCode();
    }, 30000);

    return () => clearInterval(interval);
  }, [secret]);

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
              <Pressable onPress={copyToClipboard}>
                <Copy color={Colors.MAIN} size={35} strokeWidth={1} />
              </Pressable>
            </View>
            <Link href="/(tabs)/services/qrCode" style={styles.subText}>
              Clique aqui e escaneie o QR code novamente
            </Link>
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
    marginTop: "-15%",
  },
  code: {
    backgroundColor: Colors.ZINC900,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 10,
    padding: 10,
    width: "90%",
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
