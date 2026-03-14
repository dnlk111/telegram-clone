import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { useTheme } from "../themes";

const MOCK_CONTACTS = [
  { id: "2", name: "Alex" },
  { id: "4", name: "Kate" },
  { id: "7", name: "John" },
  { id: "8", name: "Anna" },
];

export default function NewChatScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  const handleSelect = (contactId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.replace(`/chat/${contactId}` as const);
  };

  const handleNewGroup = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // TODO: new group flow
    router.back();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: insets.top + 8, backgroundColor: colors.headerBackground }]}>
        <Pressable onPress={() => router.back()} hitSlop={12} style={styles.backBtn}>
          <Text style={[styles.backArrow, { color: colors.accent }]}>←</Text>
        </Pressable>
        <Text style={[styles.title, { color: colors.primaryText }]}>New Message</Text>
      </View>
      <Pressable
        style={[styles.groupRow, { borderBottomColor: colors.separator }]}
        onPress={handleNewGroup}
      >
        <View style={[styles.groupIcon, { backgroundColor: colors.accent }]}>
          <Text style={styles.groupIconText}>👥</Text>
        </View>
        <Text style={[styles.groupLabel, { color: colors.primaryText }]}>New Group</Text>
      </Pressable>
      <Text style={[styles.sectionLabel, { color: colors.secondaryText }]}>Contacts</Text>
      <FlatList
        data={MOCK_CONTACTS}
        keyExtractor={(c) => c.id}
        renderItem={({ item }) => (
          <Pressable
            style={[styles.contactRow, { borderBottomColor: colors.separator }]}
            onPress={() => handleSelect(item.id)}
          >
            <View style={[styles.avatar, { backgroundColor: colors.accent }]}>
              <Text style={styles.avatarText}>{item.name[0]}</Text>
            </View>
            <Text style={[styles.contactName, { color: colors.primaryText }]}>{item.name}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 12,
    paddingHorizontal: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  backBtn: { padding: 12 },
  backArrow: { fontSize: 28 },
  title: { fontSize: 17, fontWeight: "600", marginLeft: 8 },
  groupRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 12,
  },
  groupIcon: { width: 50, height: 50, borderRadius: 25, alignItems: "center", justifyContent: "center" },
  groupIconText: { fontSize: 24 },
  groupLabel: { fontSize: 17, fontWeight: "500" },
  sectionLabel: { fontSize: 13, fontWeight: "600", marginHorizontal: 16, marginTop: 16, marginBottom: 8 },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 12,
  },
  avatar: { width: 50, height: 50, borderRadius: 25, alignItems: "center", justifyContent: "center" },
  avatarText: { color: "#FFF", fontSize: 20, fontWeight: "600" },
  contactName: { fontSize: 17 },
});
