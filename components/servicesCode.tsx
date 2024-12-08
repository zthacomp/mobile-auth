import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import {
  Pressable,
  Text,
  StyleSheet,
  Image,
  View,
  ImageSourcePropType,
} from "react-native";

interface servicesProps {
  title: string;
  image: ImageSourcePropType;
  secret: string;
}

export const ServicesCode: React.FC<servicesProps> = ({
  title,
  image,
  secret,
}) => {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: "./authentication",
      params: { secret },
    });
  };

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <Image style={styles.img} source={image} />
      <View style={styles.textInfo}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>
          Clique para ver seu codigo de acesso.
        </Text>
      </View>
      <ChevronRight style={styles.icon} color={Colors.MAIN} strokeWidth={1} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.ZINC900,
    padding: 20,
    borderRadius: 10,
    flexDirection: "row",
    marginVertical: 5,
    position: "relative",
  },
  img: {
    height: 50,
    width: 60,
    borderRadius: 15,
    marginTop: "1%",
  },
  textInfo: {
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
    paddingBottom: 5,
    color: Colors.ZINC200,
    fontFamily: "Inter_400Regular",
  },
  description: {
    color: Colors.ZINC400,
    fontFamily: "Inter_400Regular",
    fontSize: 11,
  },
  icon: {
    marginVertical: "5%",
  },
});
