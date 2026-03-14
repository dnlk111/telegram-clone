import React, { useRef } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import type { ChatItem } from "../utils/mockChats";
import type { ThemeColors } from "../themes";

function formatTime(ts: number): string {
  const d = new Date(ts);
  const now = new Date();
  const diff = now.getTime() - ts;
  if (diff < 86400000) return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  if (diff < 604800000) return d.toLocaleDateString([], { weekday: "short" });
  return d.toLocaleDateString([], { month: "short", day: "numeric" });
}

interface ChatRowProps {
  chat: ChatItem;
  colors: ThemeColors;
  onPress: () => void;
  onArchive: () => void;
  onPin: () => void;
  onMute: () => void;
  onDelete: () => void;
}

export function ChatRow({
  chat,
  colors,
  onPress,
  onArchive,
  onPin,
  onMute,
  onDelete,
}: ChatRowProps) {
  const swipeRef = useRef<Swipeable>(null);

  const closeAnd = (fn: () => void) => {
    fn();
    swipeRef.current?.close();
  };

  const renderRightActions = () => (
    <View style={[styles.actionsRow, { backgroundColor: colors.separator }]}>
      <Pressable style={[styles.actionBtn, { backgroundColor: colors.secondaryText }]} onPress={() => closeAnd(onArchive)}>
        <Text style={styles.actionText}>{chat.isArchived ? "Unarchive" : "Archive"}</Text>
      </Pressable>
      <Pressable style={[styles.actionBtn, { backgroundColor: colors.destructive }]} onPress={() => closeAnd(onDelete)}>
        <Text style={styles.actionText}>Delete</Text>
      </Pressable>
    </View>
  );

  const renderLeftActions = () => (
    <View style={[styles.actionsRow, { backgroundColor: colors.separator }]}>
      <Pressable style={[styles.actionBtn, { backgroundColor: colors.accent }]} onPress={() => closeAnd(onPin)}>
        <Text style={styles.actionText}>{chat.isPinned ? "Unpin" : "Pin"}</Text>
      </Pressable>
      <Pressable style={[styles.actionBtn, { backgroundColor: colors.secondaryText }]} onPress={() => closeAnd(onMute)}>
        <Text style={styles.actionText}>{chat.isMuted ? "Unmute" : "Mute"}</Text>
      </Pressable>
    </View>
  );

  return (
    <Swipeable
      ref={swipeRef}
      renderRightActions={renderRightActions}
      renderLeftActions={renderLeftActions}
      friction={2}
    >
      <Pressable
        style={[styles.row, { backgroundColor: colors.background, borderBottomColor: colors.separator }]}
        onPress={onPress}
        android_ripple={{ color: colors.separator }}
      >
        <View style={[styles.avatar, { backgroundColor: colors.accent }]}>
          <Text style={styles.avatarText} numberOfLines={1}>
            {chat.title.charAt(0).toUpperCase()}
          </Text>
        </View>
        <View style={styles.content}>
          <View style={styles.topRow}>
            <Text style={[styles.title, { color: colors.primaryText }]} numberOfLines={1}>
              {chat.title}
            </Text>
            <Text style={[styles.time, { color: colors.secondaryText }]}>
              {formatTime(chat.lastMessageAt)}
            </Text>
          </View>
          <View style={styles.bottomRow}>
            <Text
              style={[
                styles.preview,
                {
                  color: colors.secondaryText,
                  fontWeight: chat.unreadCount > 0 ? "600" : "400",
                },
              ]}
              numberOfLines={1}
            >
              {chat.lastMessage}
            </Text>
            {chat.unreadCount > 0 && (
              <View style={[styles.badge, { backgroundColor: colors.accent }]}>
                <Text style={styles.badgeText}>
                  {chat.unreadCount > 99 ? "99+" : chat.unreadCount}
                </Text>
              </View>
            )}
            {chat.isMuted && chat.unreadCount === 0 && (
              <Text style={styles.muteIcon}>🔕</Text>
            )}
          </View>
        </View>
      </Pressable>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "transparent",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "600",
  },
  content: { flex: 1, minWidth: 0 },
  topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 2 },
  title: { fontSize: 16, fontWeight: "600", flex: 1 },
  time: { fontSize: 12 },
  bottomRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  preview: { flex: 1, fontSize: 14 },
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  badgeText: { color: "#FFF", fontSize: 12, fontWeight: "600" },
  muteIcon: { fontSize: 12 },
  actionsRow: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "flex-end",
  },
  actionBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: 72,
    paddingHorizontal: 12,
  },
  actionText: { color: "#FFF", fontSize: 12, fontWeight: "600" },
});
