import { View, Text, StyleSheet, ScrollView, Pressable, Switch } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../themes";
import { useSettingsStore } from "../../store/useSettingsStore";
import { useT } from "../../utils/i18n";
import * as Haptics from "expo-haptics";

type ThemeMode = "light" | "dark" | "system";

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const t = useT();
  const { theme, setTheme, locale, setLocale } = useSettingsStore();

  const setThemeWithHaptic = (v: ThemeMode) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setTheme(v);
  };

  const setLocaleWithHaptic = (v: "ru" | "en") => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setLocale(v);
  };

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.secondaryText }]}>{title}</Text>
      <View style={[styles.sectionContent, { backgroundColor: colors.backgroundSecondary }]}>
        {children}
      </View>
    </View>
  );

  const Row = ({
    label,
    value,
    onPress,
    right,
  }: {
    label: string;
    value?: string;
    onPress?: () => void;
    right?: React.ReactNode;
  }) => (
    <Pressable
      style={[styles.row, { borderBottomColor: colors.separator } as const]}
      onPress={onPress}
      disabled={!onPress && !right}
    >
      <Text style={[styles.rowLabel, { color: colors.primaryText }]}>{label}</Text>
      {right ?? (value && <Text style={[styles.rowValue, { color: colors.secondaryText }]}>{value}</Text>)}
      {onPress && <Text style={[styles.chevron, { color: colors.secondaryText }]}>›</Text>}
    </Pressable>
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingTop: insets.top + 8, paddingBottom: insets.bottom + 24 }}
    >
      <View style={[styles.header, { paddingBottom: 12 }]}>
        <Text style={[styles.title, { color: colors.primaryText }]}>{t("settings")}</Text>
      </View>

      <Section title={t("profile")}>
        <Row label={t("profile")} onPress={() => {}} value="Name, phone" />
      </Section>

      <Section title={t("notifications")}>
        <View style={[styles.row, { borderBottomColor: colors.separator, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }]}>
          <Text style={[styles.rowLabel, { color: colors.primaryText }]}>{t("notifications")}</Text>
          <Switch value={true} onValueChange={() => {}} trackColor={{ false: colors.separator, true: colors.accent }} />
        </View>
      </Section>

      <Section title={t("appearance")}>
        <Row label={t("theme")} value={theme === "system" ? t("themeSystem") : theme === "dark" ? t("themeDark") : t("themeLight")} onPress={() => {}} />
        <View style={styles.themeRow}>
          <Pressable style={[styles.themeBtn, theme === "light" && { backgroundColor: colors.accent }]} onPress={() => setThemeWithHaptic("light")}>
            <Text style={[styles.themeBtnText, { color: theme === "light" ? "#FFF" : colors.primaryText }]}>{t("themeLight")}</Text>
          </Pressable>
          <Pressable style={[styles.themeBtn, theme === "dark" && { backgroundColor: colors.accent }]} onPress={() => setThemeWithHaptic("dark")}>
            <Text style={[styles.themeBtnText, { color: theme === "dark" ? "#FFF" : colors.primaryText }]}>{t("themeDark")}</Text>
          </Pressable>
          <Pressable style={[styles.themeBtn, theme === "system" && { backgroundColor: colors.accent }]} onPress={() => setThemeWithHaptic("system")}>
            <Text style={[styles.themeBtnText, { color: theme === "system" ? "#FFF" : colors.primaryText }]}>{t("themeSystem")}</Text>
          </Pressable>
        </View>
      </Section>

      <Section title={t("language")}>
        <View style={styles.themeRow}>
          <Pressable style={[styles.themeBtn, locale === "en" && { backgroundColor: colors.accent }]} onPress={() => setLocaleWithHaptic("en")}>
            <Text style={[styles.themeBtnText, { color: locale === "en" ? "#FFF" : colors.primaryText }]}>EN</Text>
          </Pressable>
          <Pressable style={[styles.themeBtn, locale === "ru" && { backgroundColor: colors.accent }]} onPress={() => setLocaleWithHaptic("ru")}>
            <Text style={[styles.themeBtnText, { color: locale === "ru" ? "#FFF" : colors.primaryText }]}>RU</Text>
          </Pressable>
        </View>
      </Section>

      <Section title={t("privacy")}>
        <Row label={t("privacy")} onPress={() => {}} />
      </Section>

      <Section title={t("dataAndStorage")}>
        <Row label={t("dataAndStorage")} onPress={() => {}} />
      </Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 16 },
  title: { fontSize: 28, fontWeight: "700" },
  section: { marginTop: 24 },
  sectionTitle: { fontSize: 13, fontWeight: "600", marginHorizontal: 16, marginBottom: 8 },
  sectionContent: { borderRadius: 12, marginHorizontal: 16, overflow: "hidden" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  rowLabel: { flex: 1, fontSize: 17 },
  rowValue: { fontSize: 17, marginRight: 8 },
  chevron: { fontSize: 20 },
  themeRow: { flexDirection: "row", padding: 12, gap: 8 },
  themeBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "rgba(128,128,128,0.2)",
  },
  themeBtnText: { fontSize: 14, fontWeight: "600" },
});
