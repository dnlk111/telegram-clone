import { create } from "zustand";
import type { MessageItem } from "../utils/mockMessages";
import { getMockMessagesForChat } from "../utils/mockMessages";

type MessagesState = {
  messagesByChat: Record<string, MessageItem[]>;
  getMessages: (chatId: string) => MessageItem[];
  addMessage: (chatId: string, message: Omit<MessageItem, "id" | "createdAt">) => void;
  setReaction: (chatId: string, messageId: string, emoji: string) => void;
  initChat: (chatId: string) => void;
};

export const useMessagesStore = create<MessagesState>((set, get) => ({
  messagesByChat: {},

  initChat: (chatId) => {
    const { messagesByChat } = get();
    if (messagesByChat[chatId]) return;
    set((s) => ({
      messagesByChat: {
        ...s.messagesByChat,
        [chatId]: getMockMessagesForChat(chatId),
      },
    }));
  },

  getMessages: (chatId) => {
    const { messagesByChat, initChat } = get();
    if (!messagesByChat[chatId]) {
      initChat(chatId);
      return getMockMessagesForChat(chatId);
    }
    return messagesByChat[chatId];
  },

  addMessage: (chatId, payload) => {
    const msg: MessageItem = {
      ...payload,
      id: `msg_${Date.now()}_${Math.random().toString(36).slice(2)}`,
      createdAt: Date.now(),
    };
    set((s) => ({
      messagesByChat: {
        ...s.messagesByChat,
        [chatId]: [...(s.messagesByChat[chatId] ?? []), msg],
      },
    }));
    return msg;
  },

  setReaction: (chatId, messageId, emoji) => {
    set((s) => {
      const list = s.messagesByChat[chatId] ?? [];
      return {
        messagesByChat: {
          ...s.messagesByChat,
          [chatId]: list.map((m) => {
            if (m.id !== messageId) return m;
            const next = { ...(m.reactions ?? {}), [emoji]: ((m.reactions ?? {})[emoji] ?? 0) + 1 };
            return { ...m, reactions: next };
          }),
        },
      };
    });
  },
}));
