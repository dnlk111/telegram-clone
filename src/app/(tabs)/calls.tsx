import { useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../themes";
import { useCallsStore } from "../../store/useCallsStore";
import { IncomingCallModal } from "../../components/IncomingCallModal";
import { useT } from "../../utils/i18n";

export default function CallsScreen() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const t = useT();
  const { calls, setIncomingCall } = useCallsStore();

  // Опционально: симуляция входящего звонка через 10 с (для демо)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIncomingCall({
        id: "demo",
        userId: "2",
        userName: "Alex",
        type: "voice",
        direction: "incoming",
        status: "completed",
        startedAt: Date.now(),
      });
    }, 10000);
    return () => clearTimeout(timer);
  }, [setIncomingCall]);

  const formatDuration = (sec?: number) => {
    if (sec == null) return "";
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const formatDate = (ts: number) => {
    const d = new Date(ts);
    const now = new Date();
    const diff = now.getTime() - ts;
    if (diff < 86400000) return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    if (diff < 604800000) return d.toLocaleDateString([], { weekday: "short" });
    return d.toLocaleDateString([], { month: "short", day: "numeric" });
  };

  const getStatusText = (call: (typeof calls)[0]) => {
    if (call.status === "missed") return "Missed";
    if (call.status === "declined") return "Declined";
    if (call.direction === "incoming") return formatDuration(call.duration) || "Incoming";
    return formatDuration(call.duration) || "Outgoing";
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <Text style={[styles.title, { color: colors.primaryText }]}>{t("calls")}</Text>
      </View>
      <FlatList
        data={calls}
        keyExtractor={(c) => c.id}
        contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
        renderItem={({ item }) => (
          <Pressable
            style={[styles.row, { borderBottomColor: colors.separator }]}
            onPress={() => {}}
          >
            <View style={[styles.avatar, { backgroundColor: colors.accent }]}>
              <Text style={styles.avatarText}>{item.userName[0]}</Text>
            </View>
            <View style={styles.rowContent}>
              <Text style={[styles.name, { color: colors.primaryText }]}>{item.userName}</Text>
              <View style={styles.rowMeta}>
                <Text style={[styles.meta, { color: item.status === "missed" ? colors.destructive : colors.secondaryText }]}>
                  {item.type === "video" ? "📹 " : "📞 "}{getStatusText(item)}
                </Text>
              </View>
            </View>
            <Text style={[styles.date, { color: colors.secondaryText }]}>{formatDate(item.startedAt)}</Text>
          </Pressable>
        )}
      />
      <IncomingCallModal />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 16, paddingBottom: 12 },
  title: { fontSize: 28, fontWeight: "700" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 12,
  },
  avatar: { width: 50, height: 50, borderRadius: 25, alignItems: "center", justifyContent: "center" },
  avatarText: { color: "#FFF", fontSize: 20, fontWeight: "600" },
  rowContent: { flex: 1, minWidth: 0 },
  name: { fontSize: 17, fontWeight: "500" },
  rowMeta: { marginTop: 2 },
  meta: { fontSize: 14 },
  date: { fontSize: 14 },
});
