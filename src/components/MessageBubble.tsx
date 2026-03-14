import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import type { MessageItem } from "../utils/mockMessages";
import type { ThemeColors } from "../themes";

interface MessageBubbleProps {
  message: MessageItem;
  colors: ThemeColors;
  onLongPress?: () => void;
  onDoubleTap?: () => void;
}

function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function StatusIcon({ status }: { status: MessageItem["status"] }) {
  if (status === "read") return <Text style={styles.statusIcon}>✓✓</Text>;
  if (status === "delivered" || status === "sent") return <Text style={styles.statusIcon}>✓✓</Text>;
  if (status === "pending") return <Text style={styles.statusIcon}>✓</Text>;
  return null;
}

export function MessageBubble({ message, colors, onLongPress, onDoubleTap }: MessageBubbleProps) {
  const isOut = message.isOutgoing;
  const bg = isOut ? colors.bubbleOut : colors.bubbleIn;
  const textColor = isOut ? colors.bubbleOutText : colors.bubbleInText;

  return (
    <Pressable
      onLongPress={onLongPress}
      onPress={onDoubleTap}
      style={[styles.wrap, isOut ? styles.wrapOut : styles.wrapIn]}
    >
      <View style={[styles.bubble, { backgroundColor: bg }]}>
        {message.replyTo && (
          <View style={[styles.replyBar, { borderLeftColor: colors.accent }]}>
            <Text style={[styles.replyName, { color: colors.accent }]} numberOfLines={1}>
              {message.replyTo.senderName}
            </Text>
            <Text style={[styles.replyText, { color: colors.secondaryText }]} numberOfLines={1}>
              {message.replyTo.text}
            </Text>
          </View>
        )}
        {message.type === "voice" && message.duration != null && (
          <View style={styles.voiceRow}>
            <Text style={styles.voiceIcon}>🎤</Text>
            <Text style={[styles.voiceDuration, { color: textColor }]}>{message.duration}s</Text>
          </View>
        )}
        {message.type === "text" && (
          <Text style={[styles.text, { color: textColor }]} selectable>
            {message.text}
            {message.isEdited && <Text style={[styles.edited, { color: colors.secondaryText }]}> (edited)</Text>}
          </Text>
        )}
        {message.type === "photo" && message.mediaUri && (
          <View style={styles.photoPlaceholder}>
            <Text style={[styles.photoText, { color: textColor }]}>📷 Photo</Text>
          </View>
        )}
        {message.type === "file" && (
          <View style={styles.fileRow}>
            <Text style={styles.fileIcon}>📎</Text>
            <Text style={[styles.text, { color: textColor }]} numberOfLines={1}>{message.text || "File"}</Text>
          </View>
        )}
        <View style={styles.footer}>
          <Text style={[styles.time, { color: colors.secondaryText }]}>{formatTime(message.createdAt)}</Text>
          {isOut && <StatusIcon status={message.status} />}
          {Object.keys(message.reactions ?? {}).length > 0 && (
            <View style={[styles.reactions, { backgroundColor: colors.separator }]}>
              {Object.entries(message.reactions ?? {}).map(([emoji, count]) => (
                <Text key={emoji} style={styles.reactionEmoji}>
                  {emoji} {count > 1 ? count : ""}
                </Text>
              ))}
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: { maxWidth: "82%", marginVertical: 2 },
  wrapOut: { alignSelf: "flex-end", marginRight: 12 },
  wrapIn: { alignSelf: "flex-start", marginLeft: 12 },
  bubble: {
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 60,
  },
  text: { fontSize: 16, lineHeight: 22 },
  edited: { fontSize: 12, fontStyle: "italic" },
  replyBar: {
    borderLeftWidth: 3,
    paddingLeft: 8,
    marginBottom: 6,
  },
  replyName: { fontSize: 13, fontWeight: "600" },
  replyText: { fontSize: 13 },
  voiceRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  voiceIcon: { fontSize: 20 },
  voiceDuration: { fontSize: 14 },
  photoPlaceholder: {
    width: 200,
    height: 150,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  photoText: { fontSize: 14 },
  fileRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  fileIcon: { fontSize: 18 },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 4,
    marginTop: 4,
  },
  time: { fontSize: 11 },
  statusIcon: { fontSize: 14, color: "#34CF43" },
  reactions: {
    flexDirection: "row",
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    gap: 4,
  },
  reactionEmoji: { fontSize: 14 },
});
