import { Pressable, StyleSheet, Text, View } from "react-native";
import { useFontsLoaded } from "@/assets/fonts/fonts";
import { Href, Link } from "expo-router";
interface ButtonProps {
  text: string;
  color: string;
  link: Href;
}

export const ButtonComponent: React.FC<ButtonProps> = ({
  text,
  color,
  link,
}) => {
  const fontsLoaded = useFontsLoaded();

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading fonts...</Text>
      </View>
    );
  }
  return (
    <Link
      replace
      href={link}
      style={[styles.button, { backgroundColor: color }]}
      asChild
    >
      <Pressable>
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 335,
    height: 45,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  text: {
    fontFamily: "Inter_600SemiBold",
  },
});
