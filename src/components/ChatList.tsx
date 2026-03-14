import React from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { useChatListStore } from "../store/useChatListStore";
import { ChatRow } from "./ChatRow";
import type { ThemeColors } from "../themes";
import type { ChatItem } from "../utils/mockChats";

interface ChatListProps {
  colors: ThemeColors;
  onChatPress: (chat: ChatItem) => void;
}

function SectionHeader({ title, colors }: { title: string; colors: ThemeColors }) {
  return (
    <View style={[styles.sectionHeader, { backgroundColor: colors.backgroundSecondary }]}>
      <Text style={[styles.sectionTitle, { color: colors.secondaryText }]}>{title}</Text>
    </View>
  );
}

export function ChatList({ colors, onChatPress }: ChatListProps) {
  const {
    getPinnedChats,
    getMainChats,
    getArchivedChats,
    currentFolder,
    setFolder,
    pinChat,
    archiveChat,
    muteChat,
    deleteChat,
  } = useChatListStore();

  const pinned = getPinnedChats();
  let main = getMainChats();
  const archived = [...getArchivedChats()].sort((a, b) => b.lastMessageAt - a.lastMessageAt);
  if (currentFolder === "unread") {
    main = main.filter((c) => c.unreadCount > 0);
  }

  const folders: { id: "all" | "unread" | "archived"; label: string }[] = [
    { id: "all", label: "All" },
    { id: "unread", label: "Unread" },
    { id: "archived", label: "Archived" },
  ];

  const renderChat = ({ item }: { item: ChatItem }) => (
    <ChatRow
      chat={item}
      colors={colors}
      onPress={() => onChatPress(item)}
      onArchive={() => archiveChat(item.id, !item.isArchived)}
      onPin={() => pinChat(item.id, !item.isPinned)}
      onMute={() => muteChat(item.id, !item.isMuted)}
      onDelete={() => deleteChat(item.id)}
    />
  );

  if (currentFolder === "archived") {
    return (
      <View style={styles.container}>
        <View style={[styles.folderTabs, { borderBottomColor: colors.separator }]}>
          {folders.map((f) => (
            <Pressable
              key={f.id}
              onPress={() => setFolder(f.id)}
              style={[styles.folderTab, currentFolder === f.id && { borderBottomColor: colors.accent }]}
            >
              <Text
                style={[
                  styles.folderTabText,
                  { color: currentFolder === f.id ? colors.accent : colors.secondaryText },
                ]}
              >
                {f.label}
              </Text>
            </Pressable>
          ))}
        </View>
        <FlatList
          data={archived}
          keyExtractor={(c) => c.id}
          renderItem={renderChat}
          ListEmptyComponent={
            <Text style={[styles.empty, { color: colors.secondaryText }]}>No archived chats</Text>
          }
        />
      </View>
    );
  }

  const listData: (ChatItem | { type: "header"; title: string })[] = [];
  if (pinned.length > 0) {
    listData.push({ type: "header", title: "Pinned" });
    pinned.forEach((c) => listData.push(c));
  }
  listData.push({ type: "header", title: "All Chats" });
  main.forEach((c) => listData.push(c));

  const isHeader = (x: ChatItem | { type: "header"; title: string }): x is { type: "header"; title: string } =>
    "type" in x && x.type === "header";

  return (
    <View style={styles.container}>
      <View style={[styles.folderTabs, { borderBottomColor: colors.separator }]}>
        {folders.map((f) => (
          <Pressable
            key={f.id}
            onPress={() => setFolder(f.id)}
            style={[styles.folderTab, currentFolder === f.id && { borderBottomColor: colors.accent }]}
          >
            <Text
              style={[
                styles.folderTabText,
                { color: currentFolder === f.id ? colors.accent : colors.secondaryText },
              ]}
            >
              {f.label}
            </Text>
          </Pressable>
        ))}
      </View>
      <FlatList
        data={listData}
        keyExtractor={(item) => (isHeader(item) ? `header-${item.title}` : item.id)}
        renderItem={({ item }) => {
          if (isHeader(item)) {
            return <SectionHeader title={item.title} colors={colors} />;
          }
          return renderChat({ item });
        }}
        ListFooterComponent={
          archived.length > 0 ? (
            <Pressable
              style={[styles.archivedRow, { backgroundColor: colors.background }]}
              onPress={() => setFolder("archived")}
            >
              <View style={[styles.archiveIcon, { backgroundColor: colors.separator }]} />
              <Text style={[styles.archivedText, { color: colors.secondaryText }]}>
                Archived ({archived.length})
              </Text>
            </Pressable>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  folderTabs: {
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingHorizontal: 8,
  },
  folderTab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  folderTabText: { fontSize: 15, fontWeight: "600" },
  sectionHeader: {
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  sectionTitle: { fontSize: 13, fontWeight: "600", textTransform: "uppercase" },
  empty: { textAlign: "center", paddingVertical: 24, fontSize: 15 },
  archivedRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 12,
  },
  archiveIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  archivedText: { fontSize: 16, fontWeight: "500" },
});
