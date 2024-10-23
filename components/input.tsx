import { Colors } from "@/constants/Colors";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface InputProps {
  value: any;
  onChangeText: (text: string) => void;
  place: string;
  image: React.ReactNode;
  isPassword: boolean;
  height: number;
  width: number;
  editable: boolean;
}

export const InputComponent: React.FC<InputProps> = ({
  value,
  onChangeText,
  place,
  image,
  isPassword,
  height,
  width,
  editable,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={[
        styles.container,
        { height, borderColor: isFocused ? Colors.MAIN : "transparent" },
      ]}
    >
      {image && <View style={styles.imageContainer}>{image}</View>}
      <TextInput
        style={[styles.textInput, { height: height - 2, width }]}
        placeholder={place}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={Colors.ZINC400}
        secureTextEntry={isPassword}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        editable={editable}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    margin: 5,
    borderWidth: 1,
    borderRadius: 10,
  },
  imageContainer: {
    position: "absolute",
    left: 21,
    top: 14,
    zIndex: 1,
  },
  textInput: {
    width: "100%",
    borderRadius: 10,
    backgroundColor: Colors.ZINC900,
    paddingLeft: 49,
    color: Colors.WHITE,
    fontFamily: "Inter_500Medium",
  },
});
