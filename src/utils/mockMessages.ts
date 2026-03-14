/**
 * Mock messages per chat — позже заменить на WatermelonDB
 */
export type MessageType = "text" | "photo" | "voice" | "file" | "sticker";
export type MessageStatus = "pending" | "sent" | "delivered" | "read";

export interface MessageItem {
  id: string;
  chatId: string;
  senderId: string;
  senderName: string;
  text: string;
  type: MessageType;
  mediaUri?: string | null;
  duration?: number; // voice
  isOutgoing: boolean;
  status: MessageStatus;
  createdAt: number;
  replyTo?: { id: string; text: string; senderName: string } | null;
  reactions?: Record<string, number>;
  isEdited?: boolean;
}

const now = Date.now();

function msg(
  id: string,
  chatId: string,
  text: string,
  isOut: boolean,
  opts: Partial<MessageItem> = {}
): MessageItem {
  return {
    id,
    chatId,
    senderId: isOut ? "me" : "other",
    senderName: isOut ? "You" : "Contact",
    text,
    type: "text",
    isOutgoing: isOut,
    status: isOut ? "read" : "sent",
    createdAt: opts.createdAt ?? now,
    ...opts,
  };
}

export const MOCK_MESSAGES: Record<string, MessageItem[]> = {
  "1": [
    msg("m1", "1", "You can save messages here for later", true, { createdAt: now - 3600000 }),
    msg("m2", "1", "Tap and hold any message to save it", false, { createdAt: now - 3500000 }),
  ],
  "2": [
    msg("m1", "2", "Hey! How are you?", false, { createdAt: now - 300000, senderName: "Alex" }),
    msg("m2", "2", "I'm good, thanks! And you?", true, { createdAt: now - 280000 }),
    msg("m3", "2", "See you tomorrow!", false, { createdAt: now - 120000, senderName: "Alex" }),
    msg("m4", "2", "👍", true, { createdAt: now - 60000 }),
  ],
  "3": [
    msg("m1", "3", "Maria: Updated the mockups", false, { createdAt: now - 300000, senderName: "Maria" }),
    msg("m2", "3", "Check the new Figma link", false, { createdAt: now - 290000, senderName: "Maria" }),
  ],
  "4": [
    msg("m1", "4", "Thanks for the link", false, { createdAt: now - 86400000, senderName: "Kate" }),
  ],
  "5": [
    msg("m1", "5", "New article: React Native 0.83", false, { createdAt: now - 172800000 }),
  ],
  "6": [],
};

export function getMockMessagesForChat(chatId: string): MessageItem[] {
  const list = MOCK_MESSAGES[chatId] ?? [];
  return [...list].sort((a, b) => a.createdAt - b.createdAt);
}
