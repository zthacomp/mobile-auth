import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { NotificationComponent } from "@/components/notificationComponent";

const Notifications = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Notificações</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <NotificationComponent
          action="Login realiados"
          description="Um login foi realizado em 01/12/2024"
        />
        <NotificationComponent
          action="Login realiados"
          description="Um login foi realizado em 01/12/2024"
        />
        <NotificationComponent
          action="Login realiados"
          description="Um login foi realizado em 01/12/2024"
        />
        <NotificationComponent
          action="Login realiados"
          description="Um login foi realizado em 01/12/2024"
        />
        <NotificationComponent
          action="Login realiados"
          description="Um login foi realizado em 01/12/2024"
        />
        <NotificationComponent
          action="Login realiados"
          description="Um login foi realizado em 01/12/2024"
        />
      </ScrollView>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ZINC950,
    padding: "5%",
  },
  scrollContainer: {
    paddingBottom: 60,
    width: "100%",
  },
  text: {
    color: Colors.ZINC200,
    fontSize: 25,
    fontFamily: "Inter_700Bold",
    paddingTop: "15%",
    paddingBottom: "5%",
  },
});
