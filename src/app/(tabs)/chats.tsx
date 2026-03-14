import { View, Text } from "react-native";
import { TelegramColors } from "../../themes/colors";
import { useColorScheme } from "react-native";

export default function ChatsScreen() {
  const isDark = useColorScheme() === "dark";
  const colors = isDark ? TelegramColors.dark : TelegramColors.light;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View className="pt-12 px-4 pb-2 flex-row justify-between items-center">
        <Text style={{ color: colors.primaryText, fontSize: 28, fontWeight: "700" }}>
          Chats
        </Text>
      </View>
      <View className="flex-1 items-center justify-center px-4">
        <Text style={{ color: colors.secondaryText, textAlign: "center" }}>
          Step 1 complete. Chat list will be here (Step 3).
        </Text>
      </View>
    </View>
  );
}
