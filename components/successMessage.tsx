import { Colors } from "@/constants/Colors";
import { StyleSheet, Text } from "react-native";

interface SuccessStatusProps {
  text: string;
}

export const SuccessStatus = ({ text }: SuccessStatusProps) => {
  return <Text style={styles.success}>{text}</Text>;
};

const styles = StyleSheet.create({
  success: {
    color: Colors.MAIN,
    margin: 10,
  },
});
