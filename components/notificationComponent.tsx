import { Colors } from "@/constants/Colors";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react-native";
import {
  deleteUserNotifications,
  updateNotificationsStatus,
} from "@/src/services/notificationServices";

type NotificationProps = {
  action: string;
  description: string;
  is_read: boolean;
  time: string;
  id: string;
  token: string;
};

const calculateTimeAgo = (isoDate: string): string => {
  const notificationTime = new Date(isoDate);
  const now = new Date();
  const diffInMs = now.getTime() - notificationTime.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

  if (diffInMinutes < 1) {
    return "Agora mesmo";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minuto${diffInMinutes > 1 ? "s" : ""} atrás`;
  } else if (diffInMinutes < 1440) {
    const diffInHours = Math.floor(diffInMinutes / 60);
    return `${diffInHours} hora${diffInHours > 1 ? "s" : ""} atrás`;
  } else {
    const diffInDays = Math.floor(diffInMinutes / 1440);
    return `${diffInDays} dia${diffInDays > 1 ? "s" : ""} atrás`;
  }
};

export const NotificationComponent: React.FC<NotificationProps> = ({
  action,
  description,
  is_read,
  time,
  id,
  token,
}) => {
  const [isClicked, setIsClicked] = useState(is_read);

  const deleteNotification = async () => {
    try {
      await deleteUserNotifications(id, token);
    } catch (error: any) {
      console.log("Delete notification: " + error);
    }
  };

  const updateNotification = async () => {
    try {
      await updateNotificationsStatus(id, token);
      setIsClicked(true);
    } catch (error: any) {
      console.log("Update notification: " + error);
    }
  };
  return (
    <TouchableOpacity onPress={updateNotification} activeOpacity={0.7}>
      <View
        style={[
          styles.container,
          { backgroundColor: isClicked ? Colors.ZINC950 : Colors.ZINC900 },
        ]}
      >
        <View style={styles.content}>
          <Text style={styles.text}>{action}</Text>
          <TouchableOpacity onPress={deleteNotification}>
            <Trash2 color={Colors.ZINC400} strokeWidth={1} size={22} />
          </TouchableOpacity>
        </View>

        <Text style={styles.description}>{description}</Text>
        <Text style={styles.description}>{calculateTimeAgo(time)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: "6%",
    paddingHorizontal: "5%",
    borderBottomWidth: 1,
    borderBottomColor: Colors.ZINC900,
    borderRadius: 5,
    marginVertical: "2%",
  },
  text: {
    color: Colors.ZINC200,
    fontSize: 18,
    fontFamily: "Inter_500Medium",
  },
  description: {
    color: Colors.ZINC400,
    fontSize: 13,
    fontFamily: "Inter_500Medium",
  },
  content: {
    flexDirection: "row",
    marginBottom: 5,
    justifyContent: "space-between",
  },
});
