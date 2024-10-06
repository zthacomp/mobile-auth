import { Colors } from "@/constants/Colors";
import { Link, Href } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface buttonProps {
  image: React.ReactNode;
  text: string;
  link: Href;
}

export const LogoutComponent: React.FC<buttonProps> = ({
  image,
  text,
  link,
}) => {
  return (
    <Link href={link} asChild>
      <Pressable style={styles.container}>
        <View style={styles.content}>
          {image}
          <Text style={styles.text}>{text}</Text>
        </View>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.ZINC900,
    borderRadius: 10,
    width: "90%",
    height: "10%",
    margin: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  content: {
    flexDirection: "row",
  },
  text: {
    paddingLeft: 10,
    color: Colors.ZINC200,
    fontFamily: "Inter_400Regular",
    fontSize: 15,
  },
});
