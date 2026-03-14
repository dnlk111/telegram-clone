import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { ThemeMode } from "../themes/colors";

type SettingsState = {
  theme: ThemeMode;
  locale: "ru" | "en";
  setTheme: (theme: ThemeMode) => void;
  setLocale: (locale: "ru" | "en") => void;
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: "system",
      locale: "en",
      setTheme: (theme) => set({ theme }),
      setLocale: (locale) => set({ locale }),
    }),
    {
      name: "telegram-settings",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
