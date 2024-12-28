import { Colors } from "@/constants/Colors";
import { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  Image,
  View,
  ImageSourcePropType,
  Pressable,
} from "react-native";
import { TOTP } from "totp-generator";
import * as Clipboard from "expo-clipboard";
import { Copy } from "lucide-react-native";

interface servicesProps {
  title: string;
  image: ImageSourcePropType;
  secret: string;
}

export const ServicesCode: React.FC<servicesProps> = ({
  title,
  image,
  secret,
}) => {
  const [token, setToken] = useState("");

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
      <Image style={styles.img} source={image} />
      <View style={styles.textInfo}>
        <Text style={styles.title}>{title}</Text>
        {token ? (
          <Text style={styles.code}>{token}</Text>
        ) : (
          <Text style={styles.description}>Escaneei o QR Code do serviço.</Text>
        )}
      </View>
      {/* <Pressable onPress={copyToClipboard}>
        <Copy color={Colors.MAIN} size={25} strokeWidth={1} />
      </Pressable> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.ZINC900,
    padding: 20,
    borderRadius: 10,
    flexDirection: "row",
    marginVertical: 5,
    position: "relative",
  },
  img: {
    height: 50,
    width: 60,
    borderRadius: 15,
    marginTop: "1%",
  },
  textInfo: {
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
    paddingBottom: 5,
    color: Colors.ZINC200,
    fontFamily: "Inter_400Regular",
  },
  icon: {
    marginVertical: "5%",
  },
  code: {
    fontSize: 20,
    color: Colors.MAIN,
    fontFamily: "Inter_400Regular",
  },
  description: {
    color: Colors.ZINC400,
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    width: "100%",
  },
});
