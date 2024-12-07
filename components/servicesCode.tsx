import { Href, Link } from "expo-router";
import { Pressable, Text, StyleSheet } from "react-native";

interface servicesProps {
  title: string;
  // image: React.ReactNode;
  link: Href;
}

export const ServicesCode: React.FC<servicesProps> = ({
  title,
  // image,
  link,
}) => {
  return (
    <Link replace href={link} style={styles.container} asChild>
      <Pressable style={styles.view}>
        {/* {image} */}
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {},
  view: {},
  text: {},
});
