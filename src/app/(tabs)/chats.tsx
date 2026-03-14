import { View, Text, StyleSheet, Pressable, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useTheme } from "../../themes";
import { ChatList } from "../../components/ChatList";
import type { ChatItem } from "../../utils/mockChats";

export default function ChatsScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const handleChatPress = (chat: ChatItem) => {
    router.push(`/chat/${chat.id}` as const);
  };

  const handleNewChat = () => {
    router.push("/new-chat" as const);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.headerBackground, paddingTop: insets.top + 8 }]}>
        <Text style={[styles.title, { color: colors.primaryText }]}>Chats</Text>
        <View style={styles.headerActions}>
          <Pressable hitSlop={12} style={styles.iconBtn}>
            <Text style={[styles.iconText, { color: colors.accent }]}>🔍</Text>
          </Pressable>
          <Pressable hitSlop={12} style={styles.iconBtn} onPress={handleNewChat}>
            <Text style={[styles.iconText, { color: colors.accent }]}>✏️</Text>
          </Pressable>
        </View>
      </View>
      <ChatList colors={colors} onChatPress={handleChatPress} />
      <Pressable
        style={[styles.fab, { backgroundColor: colors.accent }]}
        onPress={handleNewChat}
      >
        <Text style={styles.fabIcon}>✏️</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
  },
  headerActions: { flexDirection: "row", gap: 8 },
  iconBtn: { padding: 4 },
  iconText: { fontSize: 22 },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      android: { elevation: 4 },
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
    }),
  },
  fabIcon: { fontSize: 24 },
});
