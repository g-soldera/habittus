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

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { resetGame } = useGameState();
  const { t, changeLanguage, currentLanguage } = useTranslation();
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

  const handleReset = () => {
    Alert.alert(
      t("settings.resetWarning"),
      t("settings.resetConfirm"),
      [
        { text: t("common.cancel"), onPress: () => {}, style: "cancel" },
        {
          text: t("settings.resetButton"),
          onPress: async () => {
            await resetGame();
            router.replace("/triage");
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
            ⚙️ {t("settings.title").toUpperCase()}
          </ThemedText>
        </View>

        {/* Audio Settings */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            🎵 {t("settings.music").toUpperCase()}
          </ThemedText>

          {/* Background Music */}
          <View style={styles.settingRow}>
            <View style={styles.settingLabel}>
              <ThemedText style={styles.settingText}>{t("settings.music")}</ThemedText>
              <ThemedText style={styles.settingDescription}>
                Rock cyberpunk ambiente
              </ThemedText>
            </View>
            <Switch
              value={musicEnabled}
              onValueChange={toggleMusic}
              trackColor={{ false: CyberpunkColors.darkGray, true: CyberpunkColors.cyan }}
              thumbColor={musicEnabled ? CyberpunkColors.magenta : CyberpunkColors.textDisabled}
              testID="settings-music-toggle"
            />
          </View>

          {/* Music Volume */}
          {musicEnabled && (
            <View style={styles.sliderContainer}>
              <ThemedText style={styles.sliderLabel}>{t("settings.musicVolume")}</ThemedText>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={1}
                value={musicVolume}
                onValueChange={updateMusicVolume}
                minimumTrackTintColor={CyberpunkColors.cyan}
                maximumTrackTintColor={CyberpunkColors.darkGray}
                thumbTintColor={CyberpunkColors.magenta}
                testID="settings-music-volume"
              />
              <ThemedText style={styles.volumeValue}>{Math.round(musicVolume * 100)}%</ThemedText>
            </View>
          )}

          {/* Sound Effects */}
          <View style={styles.settingRow}>
            <View style={styles.settingLabel}>
              <ThemedText style={styles.settingText}>{t("settings.sfx")}</ThemedText>
              <ThemedText style={styles.settingDescription}>
                Sons de clique e ações
              </ThemedText>
            </View>
            <Switch
              value={sfxEnabled}
              onValueChange={toggleSFX}
              trackColor={{ false: CyberpunkColors.darkGray, true: CyberpunkColors.cyan }}
              thumbColor={sfxEnabled ? CyberpunkColors.magenta : CyberpunkColors.textDisabled}
              testID="settings-sfx-toggle"
            />
          </View>

          {/* SFX Volume */}
          {sfxEnabled && (
            <View style={styles.sliderContainer}>
              <ThemedText style={styles.sliderLabel}>{t("settings.sfxVolume")}</ThemedText>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={1}
                value={sfxVolume}
                onValueChange={updateSFXVolume}
                minimumTrackTintColor={CyberpunkColors.green}
                maximumTrackTintColor={CyberpunkColors.darkGray}
                thumbTintColor={CyberpunkColors.magenta}
                testID="settings-sfx-volume"
              />
              <ThemedText style={styles.volumeValue}>{Math.round(sfxVolume * 100)}%</ThemedText>
            </View>
          )}
        </View>

        {/* Language Settings */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            🌍 {t("settings.language").toUpperCase()}
          </ThemedText>

          <View style={styles.languageButtons}>
            <Pressable
              style={[
                styles.languageButton,
                currentLanguage === "pt-br" && styles.languageButtonActive,
              ]}
              onPress={() => changeLanguage("pt-br")}
              testID="settings-lang-ptbr"
            >
              <ThemedText style={[
                styles.languageButtonText,
                currentLanguage === "pt-br" && styles.languageButtonTextActive,
              ]}>
                🇧🇷 PT-BR
              </ThemedText>
            </Pressable>

            <Pressable
              style={[
                styles.languageButton,
                currentLanguage === "en-us" && styles.languageButtonActive,
              ]}
              onPress={() => changeLanguage("en-us")}
              testID="settings-lang-enus"
            >
              <ThemedText style={[
                styles.languageButtonText,
                currentLanguage === "en-us" && styles.languageButtonTextActive,
              ]}>
                🇺🇸 EN-US
              </ThemedText>
            </Pressable>
          </View>
        </View>

        {/* Danger Zone */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={[styles.sectionTitle, styles.dangerTitle]}>
            ⚠️ {t("common.warning").toUpperCase()}
          </ThemedText>

          <Pressable
            style={styles.resetButton}
            onPress={handleReset}
            testID="settings-reset-game"
          >
            <ThemedText style={styles.resetButtonText}>🔄 {t("settings.resetGame")}</ThemedText>
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
