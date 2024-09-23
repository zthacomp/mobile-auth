import { FontProvider } from "@/assets/fonts/fonts";
import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
const RootLayout = () => {
  return (
    <FontProvider>
      <StatusBar backgroundColor={Colors.ZINC950} style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </FontProvider>
  );
};

export default RootLayout;
