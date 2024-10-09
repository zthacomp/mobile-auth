import { FontProvider } from "@/assets/fonts/fonts";
import { Stack } from "expo-router";
import UserProvider from "./context";

const RootLayout = () => {
  return (
    <FontProvider>
      <UserProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </UserProvider>
    </FontProvider>
  );
};

export default RootLayout;
