import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { useTheme } from "../../themes";
import { useChatListStore } from "../../store/useChatListStore";
import { useMessagesStore } from "../../store/useMessagesStore";
import { getMockMessagesForChat } from "../../utils/mockMessages";
import { MessageBubble } from "../../components/MessageBubble";
import type { MessageItem } from "../../utils/mockMessages";

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const chat = useChatListStore((s) => s.chats.find((c) => c.id === id));
  const updateLastMessage = useChatListStore((s) => s.updateLastMessage);
  const storedMessages = useMessagesStore((s) => (id ? s.messagesByChat[id] : undefined));
  const { addMessage, initChat, setReaction } = useMessagesStore();
  const [input, setInput] = useState("");
  const listRef = useRef<FlatList>(null);

  const title = chat?.title ?? "Chat";
  const messages = id ? (storedMessages ?? getMockMessagesForChat(id)) : [];

  useEffect(() => {
    if (id) initChat(id);
  }, [id, initChat]);

  const handleSend = () => {
    const text = input.trim();
    if (!text || !id) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    addMessage(id, {
      chatId: id,
      senderId: "me",
      senderName: "You",
      text,
      type: "text",
      isOutgoing: true,
      status: "sent",
    });
    updateLastMessage(id, text, Date.now());
    setInput("");
  };

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  const renderMessage = ({ item }: { item: MessageItem }) => (
    <MessageBubble
      message={item}
      colors={colors}
      onLongPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        // TODO: context menu
      }}
      onDoubleTap={() => setReaction(id!, item.id, "❤️")}
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.headerBackground, paddingTop: insets.top + 8, borderBottomColor: colors.separator }]}>
        <Pressable onPress={handleBack} hitSlop={12} style={styles.backBtn}>
          <Text style={[styles.backArrow, { color: colors.accent }]}>←</Text>
        </Pressable>
        <View style={styles.headerCenter}>
          <Text style={[styles.title, { color: colors.primaryText }]} numberOfLines={1}>
            {title}
          </Text>
          <Text style={[styles.subtitle, { color: colors.secondaryText }]}>last seen recently</Text>
        </View>
        <View style={styles.headerRight}>
          <Pressable hitSlop={8}><Text style={[styles.icon, { color: colors.accent }]}>📹</Text></Pressable>
          <Pressable hitSlop={8}><Text style={[styles.icon, { color: colors.accent }]}>📞</Text></Pressable>
          <Pressable hitSlop={8}><Text style={[styles.icon, { color: colors.accent }]}>⋮</Text></Pressable>
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.flex1}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <FlatList
          ref={listRef}
          data={[...messages]}
          keyExtractor={(m) => m.id}
          renderItem={renderMessage}
          inverted
          contentContainerStyle={[styles.listContent, { paddingBottom: 12 }]}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={[styles.emptyText, { color: colors.secondaryText }]}>No messages yet</Text>
            </View>
          }
        />
        <View style={[styles.inputRow, { backgroundColor: colors.backgroundSecondary, paddingBottom: insets.bottom + 8 }]}>
          <Pressable style={[styles.attachBtn, { backgroundColor: colors.separator }]}>
            <Text style={styles.attachIcon}>📎</Text>
          </Pressable>
          <TextInput
            style={[styles.input, { color: colors.primaryText, backgroundColor: colors.background }]}
            placeholder="Message"
            placeholderTextColor={colors.secondaryText}
            value={input}
            onChangeText={setInput}
            multiline
            maxLength={4096}
          />
          {input.trim() ? (
            <Pressable onPress={handleSend} style={[styles.sendBtn, { backgroundColor: colors.accent }]}>
              <Text style={styles.sendIcon}>➤</Text>
            </Pressable>
          ) : (
            <Pressable style={[styles.micBtn, { backgroundColor: colors.accent }]}>
              <Text style={styles.micIcon}>🎤</Text>
            </Pressable>
          )}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  flex1: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 12,
    paddingHorizontal: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  backBtn: { padding: 12 },
  backArrow: { fontSize: 28, fontWeight: "300" },
  headerCenter: { flex: 1, marginLeft: 4, minWidth: 0 },
  title: { fontSize: 17, fontWeight: "600" },
  subtitle: { fontSize: 13, marginTop: 2 },
  headerRight: { flexDirection: "row", gap: 16, paddingRight: 8 },
  icon: { fontSize: 22 },
  listContent: { paddingHorizontal: 8, paddingTop: 12 },
  empty: { paddingVertical: 48, alignItems: "center" },
  emptyText: { fontSize: 15 },
  inputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 12,
    paddingTop: 8,
    gap: 8,
  },
  attachBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  attachIcon: { fontSize: 20 },
  input: {
    flex: 1,
    minHeight: 36,
    maxHeight: 120,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
  },
  sendBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  sendIcon: { color: "#FFF", fontSize: 18 },
  micBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  micIcon: { fontSize: 20 },
});
