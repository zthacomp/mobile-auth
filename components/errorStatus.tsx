import { StyleSheet, Text } from "react-native";

interface ErrorStatusProps {
  text: string;
}

export const ErrorStatus = ({ text }: ErrorStatusProps) => {
  return <Text style={styles.error}>{text}</Text>;
};

const styles = StyleSheet.create({
  error: {
    color: "#cf4d3f",
    margin: 10,
  },
});
