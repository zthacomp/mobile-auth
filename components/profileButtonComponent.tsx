import { Colors } from "@/constants/Colors";
import { Href, Link } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

interface buttonProps {
  image: React.ReactNode;
  text: string;
  link: Href;
}

export const ProfileButtonComponent: React.FC<buttonProps> = ({
  image,
  text,
  link,
}) => {
  return (
    <Link style={styles.container} href={link}>
      <View style={styles.content}>
        {image}
        <Text style={styles.text}>{text}</Text>
      </View>
      <ChevronRight color={Colors.MAIN} />
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.ZINC900,
    borderRadius: 10,
    width: "90%",
    height: "12%",
    margin: 5,
    flexDirection: "row",
  },
  content: {
    flexDirection: "row",
  },
  text: {
    color: Colors.ZINC200,
    fontFamily: "Inter_400Regular",
    fontSize: 15,
  },
});
