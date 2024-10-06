import React, { createContext, useContext } from "react";
import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import { StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { RotatingLoaderCircle } from "../loadScreen";

const FontContext = createContext<boolean | undefined>(undefined);

interface FontProviderProps {
  children: React.ReactNode;
}

export const FontProvider: React.FC<FontProviderProps> = ({ children }) => {
  const [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <RotatingLoaderCircle />
      </View>
    );
  }

  return (
    <FontContext.Provider value={fontsLoaded}>{children}</FontContext.Provider>
  );
};

export const useFontsLoaded = () => {
  const context = useContext(FontContext);
  if (context === undefined) {
    throw new Error("useFontsLoaded must be used within a FontProvider");
  }
  return context;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.ZINC950,
  },
});
