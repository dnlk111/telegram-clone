import { Tabs } from "expo-router";
import { View, Text } from "react-native";
import { useColorScheme } from "react-native";
import { TelegramColors } from "../../themes/colors";

function TabIcon({ name, focused }: { name: string; focused: boolean }) {
  const isDark = useColorScheme() === "dark";
  const colors = isDark ? TelegramColors.dark : TelegramColors.light;
  return (
    <View className="items-center justify-center">
      <Text
        style={{ color: focused ? colors.accent : colors.secondaryText }}
        className="text-xs"
      >
        {name}
      </Text>
    </View>
  );
}

export default function TabsLayout() {
  const isDark = useColorScheme() === "dark";
  const colors = isDark ? TelegramColors.dark : TelegramColors.light;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.secondaryText,
        tabBarStyle: {
          backgroundColor: colors.tabBarBackground,
          borderTopColor: colors.separator,
        },
      }}
    >
      <Tabs.Screen
        name="chats"
        options={{
          title: "Chats",
          tabBarIcon: ({ focused }) => <TabIcon name="Chats" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="calls"
        options={{
          title: "Calls",
          tabBarIcon: ({ focused }) => <TabIcon name="Calls" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ focused }) => <TabIcon name="Settings" focused={focused} />,
        }}
      />
    </Tabs>
  );
}
