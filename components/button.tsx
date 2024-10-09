import { Pressable, StyleSheet, Text, View } from "react-native";
import { Href, Link } from "expo-router";

interface ButtonProps {
  text: string;
  color: string;
  onPress: () => void;
}

export const ButtonComponent: React.FC<ButtonProps> = ({
  text,
  color,
  onPress,
}) => {
  return (
    <View style={[styles.button, { backgroundColor: color }]}>
      <Pressable onPress={onPress}>
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    </View>
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
