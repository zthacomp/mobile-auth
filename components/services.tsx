import { Colors } from "@/constants/Colors";
import { X } from "lucide-react-native";
import { Image, StyleSheet, Text, View } from "react-native";

interface ServicesProps {
  title: string;
  image: any;
  inscription: string;
  access: string;
  time: string;
}
export const LinkedServices: React.FC<ServicesProps> = ({
  title,
  image,
  inscription,
  access,
  time,
}) => {
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={image} />
      <View style={styles.textInfo}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>
          Desde {inscription} até o momento
        </Text>
        <Text style={styles.description}>
          Último acesso em {access} às {time}h
        </Text>
      </View>
      <X color={Colors.ZINC400} size={18} style={styles.closeIcon} />
    </View>
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
    height: 60,
    width: 60,
    borderRadius: 15,
    backgroundColor: "#fff",
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
    fontSize: 10,
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
