import { create } from "zustand";
import type { ChatItem, ChatFolderId } from "../utils/mockChats";
import { MOCK_CHATS } from "../utils/mockChats";

type ChatListState = {
  chats: ChatItem[];
  currentFolder: ChatFolderId;
  setFolder: (folder: ChatFolderId) => void;
  pinChat: (id: string, value: boolean) => void;
  archiveChat: (id: string, value: boolean) => void;
  muteChat: (id: string, value: boolean) => void;
  deleteChat: (id: string) => void;
  updateLastMessage: (chatId: string, preview: string, time: number) => void;
  getPinnedChats: () => ChatItem[];
  getArchivedChats: () => ChatItem[];
  getMainChats: () => ChatItem[];
};

export const useChatListStore = create<ChatListState>((set, get) => ({
  chats: [...MOCK_CHATS],
  currentFolder: "all",

  setFolder: (folder) => set({ currentFolder: folder }),

  pinChat: (id, value) =>
    set((s) => ({
      chats: s.chats.map((c) => (c.id === id ? { ...c, isPinned: value } : c)),
    })),

  archiveChat: (id, value) =>
    set((s) => ({
      chats: s.chats.map((c) => (c.id === id ? { ...c, isArchived: value } : c)),
    })),

  muteChat: (id, value) =>
    set((s) => ({
      chats: s.chats.map((c) => (c.id === id ? { ...c, isMuted: value } : c)),
    })),

  deleteChat: (id) =>
    set((s) => ({
      chats: s.chats.filter((c) => c.id !== id),
    })),

  updateLastMessage: (chatId, preview, time) =>
    set((s) => ({
      chats: s.chats.map((c) =>
        c.id === chatId
          ? { ...c, lastMessagePreview: preview, lastMessageAt: time }
          : c
      ),
    })),

  getPinnedChats: () => get().chats.filter((c) => c.isPinned && !c.isArchived),
  getArchivedChats: () => get().chats.filter((c) => c.isArchived),
  getMainChats: () =>
    get().chats.filter((c) => !c.isPinned && !c.isArchived).sort((a, b) => b.lastMessageAt - a.lastMessageAt),
}));
