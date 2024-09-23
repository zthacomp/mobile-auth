import { useFontsLoaded } from "@/assets/fonts/fonts";
import { Colors } from "@/constants/Colors";
import { Href, Link } from "expo-router";
import { View } from "lucide-react-native";
import { Pressable, StyleSheet, Text } from "react-native";

interface servicesProps {
  text: string;
  image: React.ReactNode;
  link: Href;
}

export const ServicesComponent: React.FC<servicesProps> = ({
  text,
  image,
  link,
}) => {
  const fontsLoaded = useFontsLoaded();

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading fonts...</Text>
      </View>
    );
  }
  return (
    <Link replace href={link} style={styles.container} asChild>
      <Pressable style={styles.view}>
        {image && <View style={styles.img}>{image}</View>}
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.ZINC900,
    borderRadius: 10,
    width: 330,
    height: 90,
    margin: 5,
  },
  view: {
    flexDirection: "row",
    alignItems: "center",
  },
  img: { marginLeft: 20 },
  text: {
    color: Colors.ZINC200,
    fontFamily: "Inter_500Medium",
    paddingLeft: 10,
  },
});
