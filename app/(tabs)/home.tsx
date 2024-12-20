import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { UserComponent } from "@/components/userComponent";
import {
  Fingerprint,
  QrCode,
  RectangleEllipsis,
  Search,
} from "lucide-react-native";
import { ServicesComponent } from "@/components/servicesProfile";
import { EmailButton } from "@/components/emailButton";
import { useContext } from "react";
import { UserContext, UserContextType } from "../context";

const home = () => {
  const { userInfo } = useContext(UserContext) as UserContextType;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <StatusBar barStyle="light-content" backgroundColor={Colors.ZINC950} />
        <UserComponent />
        {userInfo?.is_verified == false ? (
          <View style={styles.emailButtonContainer}>
            <EmailButton />
          </View>
        ) : null}
        {/* <View style={styles.inputBox}>
          <TextInput
            style={styles.textInput}
            placeholder="Pesquise os serviços disponíveis"
            placeholderTextColor={Colors.ZINC400}
          />
          <Search color={Colors.ZINC200} />
        </View> */}
        <Text style={styles.text}>Serviços</Text>
        <ServicesComponent
          text="Códigos de autenticação"
          image={
            <RectangleEllipsis color={Colors.MAIN} size={26} strokeWidth={1} />
          }
          link="./services/authenticatorServices"
        />
        <ServicesComponent
          text="Login sem senha (QR code)"
          image={<QrCode color={Colors.MAIN} size={26} strokeWidth={1} />}
          link="./services/qrCode"
        />
        {/* <ServicesComponent
          text="Login com biometria"
          image={<Fingerprint color={Colors.MAIN} size={26} strokeWidth={1} />}
          link="./"
        /> */}
      </ScrollView>
    </View>
  );
};

export default home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ZINC950,
  },
  scrollContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 100,
  },
  emailButtonContainer: { marginHorizontal: "5%" },
  text: {
    color: Colors.ZINC200,
    fontSize: 15,
    fontFamily: "Inter_500Medium",
    alignSelf: "flex-start",
    marginTop: 30,
    marginLeft: 25,
    marginBottom: 5,
  },
  inputBox: {
    backgroundColor: Colors.ZINC900,
    borderRadius: 10,
    width: "90%",
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 15,
  },
  textInput: {
    paddingLeft: 20,
    width: "80%",
    color: Colors.WHITE,
    fontFamily: "Inter_500Medium",
  },
});
