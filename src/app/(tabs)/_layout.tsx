import { Tabs } from "expo-router";
import { View, Text } from "react-native";
import { useTheme } from "../../themes";
import { useT } from "../../utils/i18n";

function TabIcon({ name, focused }: { name: string; focused: boolean }) {
  const { colors } = useTheme();
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
  const { colors } = useTheme();
  const t = useT();

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
          title: t("chats"),
          tabBarIcon: ({ focused }) => <TabIcon name={t("chats")} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="calls"
        options={{
          title: t("calls"),
          tabBarIcon: ({ focused }) => <TabIcon name={t("calls")} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t("settings"),
          tabBarIcon: ({ focused }) => <TabIcon name={t("settings")} focused={focused} />,
        }}
      />
    </Tabs>
  );
}
