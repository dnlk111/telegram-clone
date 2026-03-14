/**
 * Telegram-accurate color palette
 * Light / Dark + custom theme support
 */
export const TelegramColors = {
  light: {
    accent: "#229ED9",
    primaryText: "#000000",
    secondaryText: "#6D6D72",
    background: "#FFFFFF",
    backgroundSecondary: "#F7F7F8",
    bubbleOut: "#DCF8C6",
    bubbleIn: "#FFFFFF",
    bubbleOutText: "#000000",
    bubbleInText: "#000000",
    link: "#229ED9",
    destructive: "#FF3B30",
    separator: "#C6C6C8",
    headerBackground: "#FFFFFF",
    tabBarBackground: "#F7F7F8",
  },
  dark: {
    accent: "#229ED9",
    primaryText: "#FFFFFF",
    secondaryText: "#8E8E93",
    background: "#0F0F0F",
    backgroundSecondary: "#1C1C1E",
    bubbleOut: "#2B5278",
    bubbleIn: "#182533",
    bubbleOutText: "#FFFFFF",
    bubbleInText: "#FFFFFF",
    link: "#229ED9",
    destructive: "#FF453A",
    separator: "#38383A",
    headerBackground: "#1C1C1E",
    tabBarBackground: "#1C1C1E",
  },
} as const;

export type ThemeMode = "light" | "dark" | "system";
