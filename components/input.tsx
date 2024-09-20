import { Colors } from "@/constants/Colors";
import { StyleSheet, TextInput } from "react-native";

interface InputProps {
  value: string;
  place: string;
  image: string;
}

export const InputComponent: React.FC<InputProps> = ({
  value,
  place,
  image,
}) => {
  return <TextInput style={styles.container} placeholder={place} />;
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 50,
    borderRadius: 10,
    backgroundColor: Colors.inputBackground,
    margin: 6,
  },
});
