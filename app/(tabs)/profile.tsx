import React, { useContext, useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { BackButtonComponent } from "@/components/backButton";
import { ProfileButtonComponent } from "@/components/profileButtonComponent";
import {
  Headset,
  Lock,
  LogOut,
  MonitorSmartphone,
  Pencil,
  UserCog,
} from "lucide-react-native";
import { LogoutComponent } from "@/components/logout";
import { UserContext, UserContextType } from "../context";
import { updateImage } from "@/src/services/userServices";
import { SuccessStatus } from "@/components/successMessage";
import { ErrorStatus } from "@/components/errorStatus";
import * as ImagePicker from "expo-image-picker";

const Profile = () => {
  const { token, userInfo } = useContext(UserContext) as UserContextType;
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const pickImage = async () => {
    if (!userInfo || !userInfo.id) {
      setErrorMessage("Usuário não encontrado!");
      return;
    }

    if (!token) {
      setErrorMessage("Token é necessário");
      return;
    }

    try {
      const permissionResult =
        await ImagePicker.requestCameraPermissionsAsync();
      if (permissionResult.granted === false) {
        alert("Você precisa dar permissão para acessar a galeria!");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        const image = {
          uri: result.assets[0].uri,
          type: result.assets[0].type || "image/jpeg",
          name: `profile_${userInfo.id}.jpeg`,
        };
        await update(userInfo.id, token, image);
      }
    } catch (error: any) {
      alert("Erro ao fazer o upload da imagem: " + error.message);
    }
  };

  const update = async (userId: string, token: string, imageFile: any) => {
    try {
      await updateImage(userId, token, imageFile);
      setProfileImage(imageFile.uri);
      setSuccessMessage("Imagem atualizada com sucesso!");
    } catch (error: any) {
      setErrorMessage(
        "Erro ao atualizar a imagem: " +
          (error.response?.data?.message || error.message),
      );
    }
  };

  useEffect(() => {
    if (userInfo?.person.profile_photo_url) {
      setProfileImage(userInfo.person.profile_photo_url);
    }
  }, [userInfo?.person.profile_photo_url]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <BackButtonComponent text="Perfil" link="./home" />
        <View style={styles.user}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.icon}
              source={{
                uri: profileImage || "@/assets/images/Logo.png",
              }}
            />
            <Pencil
              style={styles.pencilIcon}
              color={Colors.MAIN}
              size={20}
              strokeWidth={1}
              onPress={pickImage}
            />
          </View>
          {successMessage ? <SuccessStatus text={successMessage} /> : null}
          {errorMessage ? <ErrorStatus text={errorMessage} /> : null}
          <Text style={styles.userName}>{userInfo?.person.name}</Text>
          <Text style={styles.email}>{userInfo?.email}</Text>
        </View>
        <ProfileButtonComponent
          text="Minha conta"
          image={<UserCog color={Colors.MAIN} strokeWidth={1} />}
          link="../profile/account"
        />
        <ProfileButtonComponent
          text="Privacidade"
          image={<Lock color={Colors.MAIN} strokeWidth={1} />}
          link="../profile/privacy"
        />
        <ProfileButtonComponent
          text="Dispositivos conectados"
          image={<MonitorSmartphone color={Colors.MAIN} strokeWidth={1} />}
          link="../profile/connectedDevices"
        />
        <ProfileButtonComponent
          text="Suporte"
          image={<Headset color={Colors.MAIN} strokeWidth={1} />}
          link="../profile/support"
        />
        <LogoutComponent
          text="Logout"
          image={<LogOut color={Colors.RED} strokeWidth={1} />}
          link="../../screens/user/login"
        />
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ZINC950,
  },
  scrollContainer: {
    paddingBottom: 210,
    alignItems: "center",
    justifyContent: "center",
  },
  user: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "55%",
    marginBottom: 20,
  },
  imageContainer: {
    position: "relative",
    width: 80,
    height: 80,
  },
  icon: {
    height: "100%",
    width: "100%",
    borderRadius: 100,
  },
  pencilIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: Colors.ZINC900,
    borderRadius: 50,
  },
  userName: {
    color: Colors.ZINC200,
    fontSize: 18,
    fontFamily: "Inter_500Medium",
    margin: 10,
  },
  email: {
    borderRadius: 5,
    paddingVertical: "1%",
    paddingHorizontal: "5%",
    backgroundColor: "#13312e",
    color: Colors.ZINC200,
    fontSize: 13,
    fontFamily: "Inter_500Medium",
  },
});
