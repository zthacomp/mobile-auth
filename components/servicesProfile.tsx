import { Colors } from "@/constants/Colors";
import { Href, Link } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";

interface servicesProps {
  text: string;
  image: React.ReactNode;
  link: Href;
}

export const ServicesComponent: React.FC<servicesProps> = ({
  text,
  image,
  link,
}) => {
  return (
    <Link replace href={link} style={styles.container} asChild>
      <Pressable style={styles.view}>
        {image}
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: Colors.ZINC900,
    borderRadius: 10,
    width: "90%",
    height: 90,
    margin: 5,
  },
  view: {
    flexDirection: "row",
    alignItems: "center",
    padding: 24
  },
  text: {
    color: Colors.ZINC200,
    fontFamily: "Inter_500Medium",
    paddingLeft: 10,
  },
});
