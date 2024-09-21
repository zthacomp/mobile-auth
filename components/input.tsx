import { Colors } from "@/constants/Colors";
import { StyleSheet, TextInput, View } from "react-native";

interface InputProps {
  value: string;
  place: string;
  image: React.ReactNode;
  isPassword: boolean;
  height: number;
  width: number;
}

export const InputComponent: React.FC<InputProps> = ({
  value,
  place,
  image,
  isPassword,
  height,
  width,
}) => {
  return (
    <View style={[styles.container, { height }]}>
      {image && <View style={styles.imageContainer}>{image}</View>}
      <TextInput
        style={[styles.textInput, { height, width }]}
        placeholder={place}
        placeholderTextColor={Colors.ZINC400}
        secureTextEntry={isPassword}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    margin: 5,
  },
  imageContainer: {
    position: "absolute",
    left: 21,
    top: 15,
    zIndex: 1,
  },
  textInput: {
    width: "100%",
    borderRadius: 10,
    backgroundColor: Colors.ZINC900,
    paddingLeft: 49,
    color: "white",
    fontFamily: "Inter_500Medium",
  },
});
