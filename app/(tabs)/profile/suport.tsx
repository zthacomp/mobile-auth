import { BackButtonComponent } from "@/components/backButton";
import { Colors } from "@/constants/Colors";
import { StyleSheet, View } from "react-native";

const suport = () => {
  return (
    <View style={styles.container}>
      <BackButtonComponent text="Suporte" link="../profile" />
      <View style={styles.content}></View>
    </View>
  );
};

export default suport;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.ZINC950,
    flex: 1,
    alignItems: "center",
  },
  content: {
    marginTop: 120,
  },
});
