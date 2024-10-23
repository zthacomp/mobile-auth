import { Pressable, StyleSheet, Text } from "react-native";

interface ButtonProps {
  text: string;
  color: string;
  onPress: () => void;
  disabled: boolean;
}

export const ButtonComponent: React.FC<ButtonProps> = ({
  text,
  color,
  onPress,
  disabled,
}) => {
  return (
    <Pressable
      style={[styles.button, { backgroundColor: disabled ? "#237f71" : color }]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{text}</Text>
    </Pressable>
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
