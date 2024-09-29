import { Colors } from "@/constants/Colors";
import { Href, Link } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

interface buttonProps {
  text: string;
  link: Href;
}

export const BackButtonComponent: React.FC<buttonProps> = ({ text, link }) => {
  return (
    <Link style={styles.container} href={link}>
      <View style={styles.content}>
        <ChevronLeft color={Colors.MAIN} />
        <Text style={styles.text}>{text}</Text>
      </View>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "6%",
    left: "1%",
    paddingTop: 10,
    padding: 10,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: Colors.ZINC200,
    fontSize: 13,
    fontFamily: "Inter_500Medium",
  },
});
