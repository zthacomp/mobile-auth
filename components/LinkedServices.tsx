import { Colors } from "@/constants/Colors";
import { X } from "lucide-react-native";
import { Image, StyleSheet, Text, View } from "react-native";

interface ServicesProps {
  title: string;
  image: any;
  inscription: Date;
  access: Date;
  time: Date;
}
export const LinkedServices: React.FC<ServicesProps> = ({
  title,
  image,
  inscription,
  access,
  time,
}) => {
  console.log(access);

  return (
    <View style={styles.container}>
      <Image style={styles.img} source={image} />
      <View style={styles.textInfo}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>
          Desde {access ? access.toString() : "Data de acesso"} até o momento
        </Text>
        <Text style={styles.description}>
          Último acesso em {access ? access.toString() : "Data de acesso"} às{" "}
          {access ? access.toString() : "Data de acesso"} h
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
