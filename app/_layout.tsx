import { FontProvider } from "@/assets/fonts/fonts";
import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <FontProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </FontProvider>
  );
};

export default RootLayout;
