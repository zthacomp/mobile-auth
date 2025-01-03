import { Colors } from "@/constants/Colors";
import { Check } from "lucide-react-native";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface settingsProps {
  text: string;
  response: boolean;
  onPress: () => void;
}

export const SettingsComponent: React.FC<settingsProps> = ({
  text,
  response,
  onPress,
}) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.text}>{text}</Text>
        <TouchableOpacity onPress={onPress} style={styles.button}>
          {response ? <Check color={Colors.MAIN} size={15} /> : null}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  scrollContainer: {},
});
