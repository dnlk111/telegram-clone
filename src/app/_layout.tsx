import "../../global.css";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useTheme } from "../themes";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const { colors, mode } = useTheme();

  useEffect(() => {
    // Hide splash when app is ready (fonts, store, etc.)
    const timer = setTimeout(() => {
      SplashScreen.hideAsync();
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style={mode === "dark" ? "light" : "dark"} />
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "default",
            contentStyle: { backgroundColor: colors.background },
          }}
        />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
