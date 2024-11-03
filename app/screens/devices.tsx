import { Colors } from "@/constants/Colors";
import { StyleSheet, Text, View } from "react-native";
import { ButtonComponent } from "../../components/button";
import { Link, router } from "expo-router";
import { KeyRound } from "lucide-react-native";
import { registerDevice } from "@/src/services/deviceServices";
import { UserContext, UserContextType } from "@/app/context";
import { useContext, useEffect, useState } from "react";
import * as Location from "expo-location";
import NetInfo from "@react-native-community/netinfo";
import { ErrorStatus } from "@/components/errorStatus";
import { RotatingLoaderCircle } from "@/assets/loadScreen";

const Devices = () => {
  const { userInfo, token } = useContext(UserContext) as UserContextType;
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [locationPermissionGranted, setLocationPermissionGranted] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const requestLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMessage("Permissão de localização negada!");
      } else {
        setLocationPermissionGranted(true);
      }
    };

    requestLocationPermission();
  }, []);

  const loginWithNewDevice = async () => {
    if (!userInfo || !userInfo.id) {
      setErrorMessage("Usuário não encontrado!");
      return;
    }

    if (!token) {
      setErrorMessage("Token é necessário");
      return;
    }

    if (!locationPermissionGranted) {
      setErrorMessage("Permissão de localização não concedida!");
      return;
    }

    try {
      setIsLoading(true);
      const netInfo = await NetInfo.fetch();
      const ipAddress =
        netInfo.details && "ipAddress" in netInfo.details
          ? (netInfo.details.ipAddress as string)
          : undefined;

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      const locationData = reverseGeocode[0];

      const formattedLocation = `${locationData.city}, ${locationData.region}`;

      const validIpAddress = ipAddress || "0.0.0.0";
      await registerDevice(userInfo.id, token, {
        ip_address: validIpAddress,
        location: formattedLocation,
      });
      router.push("/(tabs)/home");
    } catch (error) {
      setErrorMessage("Erro ao registrar o dispositivo.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <RotatingLoaderCircle />
        </View>
      ) : (
        <View style={styles.innerContainer}>
          <KeyRound color={Colors.MAIN} size={50} strokeWidth={1} />
          <Text style={styles.title}>Entrando em um dispositivo novo?</Text>
          <Text style={styles.text}>
            Nunca escaneie um QR code de outros usuários
          </Text>
          <ButtonComponent
            text="ENTRAR"
            color={Colors.MAIN}
            disabled={false}
            onPress={loginWithNewDevice}
          />
          {errorMessage ? <ErrorStatus text={errorMessage} /> : null}
          <Link
            style={{
              color: Colors.ZINC200,
              fontSize: 15,
              fontFamily: "Inter_400Regular",
            }}
            href="/screens/user/login"
          >
            Cancelar
          </Link>
        </View>
      )}
    </View>
  );
};

export default Devices;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ZINC950,
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "Inter_700Bold",
    color: Colors.ZINC200,
    fontSize: 16,
    paddingTop: 10,
  },
  text: {
    color: Colors.ZINC200,
    fontSize: 13,
    marginVertical: 10,
    fontFamily: "Inter_400Regular",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
