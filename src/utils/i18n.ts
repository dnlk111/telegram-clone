import { useSettingsStore } from "../store/useSettingsStore";

const ru: Record<string, string> = {
  chats: "Чаты",
  calls: "Звонки",
  settings: "Настройки",
  newMessage: "Новое сообщение",
  search: "Поиск",
  all: "Все",
  unread: "Непрочитанные",
  archived: "Архив",
  pinned: "Закреплённые",
  savedMessages: "Избранное",
  profile: "Профиль",
  notifications: "Уведомления",
  privacy: "Конфиденциальность",
  dataAndStorage: "Данные и память",
  appearance: "Внешний вид",
  language: "Язык",
  theme: "Тема",
  themeLight: "Светлая",
  themeDark: "Тёмная",
  themeSystem: "Системная",
  message: "Сообщение",
  noMessages: "Нет сообщений",
  lastSeen: "был(а) недавно",
  edit: "Редактировать",
  archive: "Архив",
  unarchive: "В архив",
  mute: "Без звука",
  unmute: "Включить звук",
  delete: "Удалить",
  pin: "Закрепить",
  unpin: "Открепить",
  newGroup: "Новая группа",
  contacts: "Контакты",
  callHistory: "История звонков",
  incomingCall: "Входящий звонок",
  voiceCall: "Голосовой",
  videoCall: "Видео",
};

const en: Record<string, string> = {
  chats: "Chats",
  calls: "Calls",
  settings: "Settings",
  newMessage: "New Message",
  search: "Search",
  all: "All",
  unread: "Unread",
  archived: "Archived",
  pinned: "Pinned",
  savedMessages: "Saved Messages",
  profile: "Profile",
  notifications: "Notifications",
  privacy: "Privacy and Security",
  dataAndStorage: "Data and Storage",
  appearance: "Appearance",
  language: "Language",
  theme: "Theme",
  themeLight: "Light",
  themeDark: "Dark",
  themeSystem: "System",
  message: "Message",
  noMessages: "No messages yet",
  lastSeen: "last seen recently",
  edit: "Edit",
  archive: "Archive",
  unarchive: "Unarchive",
  mute: "Mute",
  unmute: "Unmute",
  delete: "Delete",
  pin: "Pin",
  unpin: "Unpin",
  newGroup: "New Group",
  contacts: "Contacts",
  callHistory: "Call History",
  incomingCall: "Incoming Call",
  voiceCall: "Voice",
  videoCall: "Video",
};

const dict: Record<string, Record<string, string>> = { ru, en };

export function useT() {
  const locale = useSettingsStore((s) => s.locale);
  return (key: string): string => dict[locale]?.[key] ?? en[key] ?? key;
}

export function t(key: string, locale: "ru" | "en" = "en"): string {
  return dict[locale]?.[key] ?? en[key] ?? key;
}
