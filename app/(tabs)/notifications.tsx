import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { NotificationComponent } from "@/components/notificationComponent";
import { getUserNotifications } from "@/src/services/notificationServices";
import { useContext, useEffect, useState } from "react";
import { UserContext, UserContextType } from "../context";

interface notificationsData {
  id: string;
  created_at: string;
  is_read: boolean;
  message: string;
  title: string;
  updated_at: Date;
  user_id: string;
}

const Notifications = () => {
  const { userInfo, token } = useContext(UserContext) as UserContextType;
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [data, setData] = useState<notificationsData[]>([]);

  const getNotifications = async () => {
    if (!userInfo?.id || !token) {
      setErrorMessage("Usuário ou token inválido");
      return;
    }

    try {
      const response = await getUserNotifications(userInfo?.id, token);
      setData(response.data);
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    if (userInfo && token) {
      getNotifications();
    }
  }, [userInfo, token]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Notificações</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {data.length > 0 ? (
          data.map((notification: notificationsData, index) => (
            <NotificationComponent
              key={notification.id}
              action={notification.title}
              description={notification.message}
              is_read={notification.is_read}
              time={notification.created_at}
              id={notification.id}
              token={token ?? ""}
            />
          ))
        ) : (
          <View style={styles.message}>
            <Text style={styles.subTitle}>
              Você não tem nenhuma notificação
            </Text>
          </View>
        )}
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
  message: {
    backgroundColor: Colors.ZINC900,
    borderRadius: 10,
  },
  subTitle: {
    textAlign: "center",
    color: Colors.ZINC200,
    fontSize: 15,
    padding: 10,
    fontFamily: "Inter_500Medium",
  },
});
