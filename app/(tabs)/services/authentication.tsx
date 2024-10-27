import { UserContext, UserContextType } from "@/app/context";
import { UserComponent } from "@/components/userComponent";
import { Colors } from "@/constants/Colors";
import { Copy } from "lucide-react-native";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { authenticator } from "otplib";

const authentication = () => {
  const [token, setToken] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);

  const { secret } = useContext(UserContext) as UserContextType;

  const updateCode = () => {
    if (secret) {
      // const newToken = authenticator.generate(secret);
      // setToken(newToken);
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
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <UserComponent />
      </View>
      <View style={styles.innerContainer}>
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
      </View>
    </View>
  );
};

export default authentication;

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
});
