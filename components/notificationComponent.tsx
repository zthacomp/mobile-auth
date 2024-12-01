import { Colors } from "@/constants/Colors";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useState } from "react";

type NotificationProps = {
  action: string;
  description: string;
};

export const NotificationComponent: React.FC<NotificationProps> = ({
  action,
  description,
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const handlePress = () => {
    setIsClicked(true);
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <View
        style={[
          styles.container,
          { backgroundColor: isClicked ? Colors.ZINC950 : Colors.ZINC900 },
        ]}
      >
        <Text style={styles.text}>{action}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: "6%",
    paddingHorizontal: "3%",
    borderBottomWidth: 1,
    borderBottomColor: Colors.ZINC900,
    borderRadius: 5,
    marginVertical: "2%",
  },
  text: {
    color: Colors.ZINC200,
    fontSize: 20,
    fontFamily: "Inter_500Medium",
  },
  description: {
    color: Colors.ZINC400,
    fontSize: 13,
    fontFamily: "Inter_500Medium",
  },
});
