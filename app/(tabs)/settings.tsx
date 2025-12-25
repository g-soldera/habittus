import { useState, useEffect } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, View, Switch } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Slider from "@react-native-community/slider";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { CyberpunkColors } from "@/constants/theme";
import { useGameState } from "@/hooks/use-game-state";
import { useAudio } from "@/hooks/use-audio";
import { useTranslation } from "@/hooks/use-translation";
import { Jukebox } from "@/components/jukebox";

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { resetGame } = useGameState();
  const { t, changeLanguage, currentLanguage, isReady } = useTranslation();
  const { 
    musicEnabled, 
    sfxEnabled, 
    musicVolume, 
    sfxVolume,
    toggleMusic,
    toggleSFX,
    setMusicVolume: updateMusicVolume,
    setSFXVolume: updateSFXVolume 
  } = useAudio();

  // Debug: log translation status
  useEffect(() => {
    console.log('[Settings] i18n ready:', isReady);
    console.log('[Settings] current language:', currentLanguage);
    console.log('[Settings] t("settings.title"):', t('settings.title'));
    console.log('[Settings] t("common.warning"):', t('common.warning'));
  }, [isReady, currentLanguage, t]);

  const handleReset = () => {
    console.log('[Settings] handleReset called');
    console.log('[Settings] t("settings.resetWarning"):', t("settings.resetWarning"));
    console.log('[Settings] t("settings.resetConfirm"):', t("settings.resetConfirm"));
    
    Alert.alert(
      t("settings.resetWarning") || "Aviso",
      t("settings.resetConfirm") || "Tem certeza que deseja resetar o jogo? Esta ação não pode ser desfeita.",
      [
        { text: t("common.cancel") || "Cancelar", onPress: () => console.log('[Settings] Cancel pressed'), style: "cancel" },
        {
          text: t("settings.resetButton") || "Resetar",
          onPress: async () => {
            console.log('[Settings] Reset confirmed, calling resetGame');
            try {
              await resetGame();
              console.log('[Settings] resetGame completed, navigating to triage');
              router.replace("/triage");
            } catch (error) {
              console.error('[Settings] Error during reset:', error);
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <ThemedView
      style={[
        styles.container,
        {
          paddingTop: Math.max(insets.top, 20),
          paddingBottom: Math.max(insets.bottom, 20),
        },
      ]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <ThemedText type="title" style={styles.title}>
            {t("settings.title").toUpperCase()}
          </ThemedText>
        </View>

        {/* Jukebox */}
        <View style={styles.section}>
          <Jukebox />
        </View>

        {/* Language Settings */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            {t("settings.language").toUpperCase()}
          </ThemedText>

          <View style={styles.languageButtons}>
            <Pressable
              style={[
                styles.languageButton,
                currentLanguage === "pt" && styles.languageButtonActive,
              ]}
              onPress={() => changeLanguage("pt")}
              testID="settings-lang-pt"
            >
              <ThemedText style={[
                styles.languageButtonText,
                currentLanguage === "pt" && styles.languageButtonTextActive,
              ]}>
                PT-BR
              </ThemedText>
            </Pressable>

            <Pressable
              style={[
                styles.languageButton,
                currentLanguage === "en" && styles.languageButtonActive,
              ]}
              onPress={() => changeLanguage("en")}
              testID="settings-lang-en"
            >
              <ThemedText style={[
                styles.languageButtonText,
                currentLanguage === "en" && styles.languageButtonTextActive,
              ]}>
                EN-US
              </ThemedText>
            </Pressable>
          </View>
        </View>

        {/* Danger Zone */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={[styles.sectionTitle, styles.dangerTitle]}>
            {t("common.warning").toUpperCase()}
          </ThemedText>

          <Pressable
            style={styles.resetButton}
            onPress={handleReset}
            testID="settings-reset-game"
          >
            <ThemedText style={styles.resetButtonText}>{t("settings.resetGame")}</ThemedText>
          </Pressable>
          <ThemedText style={styles.resetWarning}>
            Atenção: Esta ação apaga todos os dados e não pode ser desfeita!
          </ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CyberpunkColors.darkBg,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    color: CyberpunkColors.cyan,
    fontFamily: "Courier New",
    textAlign: "center",
  },
  section: {
    backgroundColor: CyberpunkColors.cardBg,
    borderWidth: 2,
    borderColor: CyberpunkColors.purple,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    color: CyberpunkColors.cyan,
    marginBottom: 16,
    fontFamily: "Courier New",
  },
  dangerTitle: {
    color: CyberpunkColors.error,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: CyberpunkColors.darkGray,
  },
  settingLabel: {
    flex: 1,
    marginRight: 16,
  },
  settingText: {
    fontSize: 16,
    color: CyberpunkColors.textPrimary,
    fontWeight: "600",
    fontFamily: "Courier New",
  },
  settingDescription: {
    fontSize: 12,
    color: CyberpunkColors.textSecondary,
    marginTop: 4,
    fontFamily: "Courier New",
  },
  sliderContainer: {
    paddingVertical: 12,
    paddingLeft: 16,
  },
  sliderLabel: {
    fontSize: 14,
    color: CyberpunkColors.textSecondary,
    marginBottom: 8,
    fontFamily: "Courier New",
  },
  slider: {
    width: "100%",
    height: 40,
  },
  volumeValue: {
    fontSize: 12,
    color: CyberpunkColors.cyan,
    textAlign: "right",
    marginTop: 4,
    fontFamily: "Courier New",
  },
  languageButtons: {
    flexDirection: "row",
    gap: 12,
  },
  languageButton: {
    flex: 1,
    backgroundColor: CyberpunkColors.inputBg,
    borderWidth: 2,
    borderColor: CyberpunkColors.darkGray,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
  },
  languageButtonActive: {
    borderColor: CyberpunkColors.cyan,
    backgroundColor: CyberpunkColors.cardBg,
  },
  languageButtonText: {
    fontSize: 16,
    color: CyberpunkColors.textSecondary,
    fontWeight: "600",
    fontFamily: "Courier New",
  },
  languageButtonTextActive: {
    color: CyberpunkColors.cyan,
  },
  resetButton: {
    backgroundColor: CyberpunkColors.error,
    borderWidth: 2,
    borderColor: CyberpunkColors.red,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 12,
  },
  resetButtonText: {
    fontSize: 16,
    color: CyberpunkColors.textPrimary,
    fontWeight: "bold",
    fontFamily: "Courier New",
  },
  resetWarning: {
    fontSize: 12,
    color: CyberpunkColors.textSecondary,
    textAlign: "center",
    fontFamily: "Courier New",
  },
});
