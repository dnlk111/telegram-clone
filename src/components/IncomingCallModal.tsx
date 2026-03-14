import React from "react";
import { View, Text, StyleSheet, Pressable, Modal } from "react-native";
import { useTheme } from "../themes";
import { useCallsStore } from "../store/useCallsStore";
import { useT } from "../utils/i18n";

export function IncomingCallModal() {
  const { colors } = useTheme();
  const t = useT();
  const { incomingCall, acceptCall, declineCall } = useCallsStore();

  if (!incomingCall) return null;

  const isVideo = incomingCall.type === "video";

  return (
    <Modal visible={!!incomingCall} transparent animationType="fade" statusBarTranslucent>
      <View style={[styles.overlay, { backgroundColor: colors.background }]}>
        <View style={styles.content}>
          <View style={[styles.avatar, { backgroundColor: colors.accent }]}>
            <Text style={styles.avatarText}>{incomingCall.userName[0]}</Text>
          </View>
          <Text style={[styles.name, { color: colors.primaryText }]}>{incomingCall.userName}</Text>
          <Text style={[styles.label, { color: colors.secondaryText }]}>
            {isVideo ? t("videoCall") : t("voiceCall")} • {t("incomingCall")}
          </Text>
        </View>
        <View style={styles.actions}>
          <Pressable
            style={[styles.btn, styles.declineBtn, { backgroundColor: colors.destructive }]}
            onPress={() => declineCall(incomingCall.id)}
          >
            <Text style={styles.btnIcon}>📞</Text>
            <Text style={styles.btnText}>Decline</Text>
          </Pressable>
          <Pressable
            style={[styles.btn, styles.acceptBtn, { backgroundColor: "#34C759" }]}
            onPress={() => acceptCall(incomingCall.id)}
          >
            <Text style={styles.btnIcon}>✓</Text>
            <Text style={styles.btnText}>Accept</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  content: { alignItems: "center", marginBottom: 48 },
  avatar: { width: 100, height: 100, borderRadius: 50, alignItems: "center", justifyContent: "center", marginBottom: 16 },
  avatarText: { color: "#FFF", fontSize: 40, fontWeight: "600" },
  name: { fontSize: 28, fontWeight: "700", marginBottom: 8 },
  label: { fontSize: 16 },
  actions: { flexDirection: "row", gap: 32 },
  btn: { width: 72, alignItems: "center", paddingVertical: 16, borderRadius: 36 },
  declineBtn: {},
  acceptBtn: {},
  btnIcon: { fontSize: 28, marginBottom: 4 },
  btnText: { color: "#FFF", fontSize: 12, fontWeight: "600" },
});
