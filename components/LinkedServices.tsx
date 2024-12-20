import { Colors } from "@/constants/Colors";
import { X } from "lucide-react-native";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { CloseModal } from "./closeModal";
import { useState } from "react";

interface ServicesProps {
  id: string;
  title: string;
  image: any;
  inscription: string;
  access: string;
  time: string;
  onDisconnect: () => void;
  end: string;
}
export const LinkedServices: React.FC<ServicesProps> = ({
  id,
  title,
  image,
  inscription,
  access,
  time,
  onDisconnect,
  end,
}) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleDisconnect = () => {
    onDisconnect();
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.img} source={image} />
      <View style={styles.textInfo}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>
          {end == "31/12/1969"
            ? `Desde ${
                inscription ? inscription.toString() : "Data de incrição"
              } até o momento.`
            : `Serviço encerrado em ${end.toString()}.`}
        </Text>
        <Text style={styles.description}>
          {end == "31/12/1969"
            ? `Último acesso em ${time ? time.toString() : "Data de acesso."}h.`
            : null}
        </Text>
      </View>
      {end == "31/12/1969" ? (
        <Pressable style={styles.close} onPress={() => setModalVisible(true)}>
          <X color={Colors.ZINC400} size={23} />
        </Pressable>
      ) : null}

      <CloseModal
        id={id}
        ipAddress={title}
        text="Deseja encerrar este serviço?"
        visible={modalVisible}
        onDisconnect={handleDisconnect}
        onClose={() => setModalVisible(false)}
      />
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
    width: "100%",
  },
  close: {
    paddingTop: 2,
    paddingLeft: 25,
  },
});
