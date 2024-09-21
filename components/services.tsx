import { Link } from "expo-router";
import { ButtonProps, Pressable, StyleSheet, Text } from "react-native";

interface servicesProps {
  text: string;
}

export const servicesComponent: React.FC<ButtonProps> = ({ text }) => {
  return (
    <Link href="./">
      <Pressable>
        <Text>{text}</Text>
      </Pressable>
    </Link>
  );
};

const style = StyleSheet.create({});
