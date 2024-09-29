import { Colors } from "@/constants/Colors";
import { Check } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface settingsProps {
  text: string;
}

export const SettingsComponent: React.FC<settingsProps> = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <Pressable style={styles.button}>
        <Check color={Colors.MAIN} size={15} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.ZINC900,
    borderRadius: 10,
    margin: 5,
    flexDirection: "row",
    padding: "5%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    color: Colors.ZINC200,
    fontFamily: "Inter_400Regular",
    fontSize: 15,
  },
  button: {
    backgroundColor: Colors.ZINC950,
    borderRadius: 5,
    height: 25,
    width: 25,
    alignItems: "center",
    justifyContent: "center",
  },
});
