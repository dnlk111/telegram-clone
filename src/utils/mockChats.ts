/**
 * Mock chat list for Step 3 — позже заменить на WatermelonDB
 */
export type ChatFolderId = "all" | "unread" | "archived";

export interface ChatItem {
  id: string;
  title: string;
  avatarUri: string | null;
  lastMessage: string;
  lastMessageAt: number;
  unreadCount: number;
  isPinned: boolean;
  isMuted: boolean;
  isArchived: boolean;
  type: "user" | "group" | "channel";
}

export const MOCK_CHATS: ChatItem[] = [
  {
    id: "1",
    title: "Saved Messages",
    avatarUri: null,
    lastMessage: "You can save messages here",
    lastMessageAt: Date.now() - 3600000,
    unreadCount: 0,
    isPinned: true,
    isMuted: false,
    isArchived: false,
    type: "user",
  },
  {
    id: "2",
    title: "Alex",
    avatarUri: null,
    lastMessage: "See you tomorrow!",
    lastMessageAt: Date.now() - 120000,
    unreadCount: 2,
    isPinned: true,
    isMuted: false,
    isArchived: false,
    type: "user",
  },
  {
    id: "3",
    title: "Design Team",
    avatarUri: null,
    lastMessage: "Maria: Updated the mockups",
    lastMessageAt: Date.now() - 300000,
    unreadCount: 0,
    isPinned: true,
    isMuted: true,
    isArchived: false,
    type: "group",
  },
  {
    id: "4",
    title: "Kate",
    avatarUri: null,
    lastMessage: "Thanks for the link",
    lastMessageAt: Date.now() - 86400000,
    unreadCount: 0,
    isPinned: false,
    isMuted: false,
    isArchived: false,
    type: "user",
  },
  {
    id: "5",
    title: "Tech News",
    avatarUri: null,
    lastMessage: "New article: React Native 0.83",
    lastMessageAt: Date.now() - 172800000,
    unreadCount: 5,
    isPinned: false,
    isMuted: false,
    isArchived: false,
    type: "channel",
  },
  {
    id: "6",
    title: "Old Group",
    avatarUri: null,
    lastMessage: "Last message from 2024",
    lastMessageAt: Date.now() - 86400000 * 30,
    unreadCount: 0,
    isPinned: false,
    isMuted: false,
    isArchived: true,
    type: "group",
  },
];
