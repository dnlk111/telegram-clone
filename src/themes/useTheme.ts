import { useMemo } from "react";
import { useColorScheme } from "react-native";
import { useSettingsStore } from "../store/useSettingsStore";
import { TelegramColors, type ThemeMode } from "./colors";

export type ThemeColors = (typeof TelegramColors.light);

/**
 * Resolves effective theme: system → device, light/dark → fixed.
 */
export function useTheme(): { colors: ThemeColors; mode: "light" | "dark"; themeSetting: ThemeMode } {
  const systemScheme = useColorScheme();
  const themeSetting = useSettingsStore((s) => s.theme);

  const mode: "light" | "dark" = useMemo(() => {
    if (themeSetting === "system") return systemScheme === "dark" ? "dark" : "light";
    return themeSetting;
  }, [themeSetting, systemScheme]);

  const colors = useMemo(() => (mode === "dark" ? TelegramColors.dark : TelegramColors.light), [mode]);

  return { colors, mode, themeSetting };
}
