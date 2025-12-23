import { useState } from 'react';
import { ScrollView, StyleSheet, View, Pressable, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { CyberpunkColors } from '@/constants/theme';
import { useAudio } from '@/hooks/use-audio';
import { useGameState } from '@/hooks/use-game-state';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const { settings, updateSettings } = useAudio();
  const { resetGame } = useGameState();
  const router = useRouter();

  const handleReset = () => {
    Alert.alert(
      'Reset Game',
      'Tem certeza que deseja resetar o jogo? Esta ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Resetar',
          style: 'destructive',
          onPress: () => {
            resetGame();
            router.replace('/triage');
          },
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
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedText type="title" style={styles.title}>
          ⚙️ SETTINGS
        </ThemedText>

        {/* Audio Settings */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            🔊 AUDIO
          </ThemedText>

          {/* Background Music Toggle */}
          <View style={styles.settingRow}>
            <ThemedText style={styles.settingLabel}>Background Music</ThemedText>
            <Pressable
              style={[
                styles.toggle,
                settings.musicEnabled && styles.toggleActive,
              ]}
              onPress={() => updateSettings({ musicEnabled: !settings.musicEnabled })}
              testID="settings-music-toggle"
            >
              <View
                style={[
                  styles.toggleThumb,
                  settings.musicEnabled && styles.toggleThumbActive,
                ]}
              />
            </Pressable>
          </View>

          {/* Music Volume */}
          {settings.musicEnabled && (
            <View style={styles.settingRow}>
              <ThemedText style={styles.settingLabel}>
                Music Volume: {Math.round(settings.musicVolume * 100)}%
              </ThemedText>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={1}
                value={settings.musicVolume}
                onValueChange={(value) => updateSettings({ musicVolume: value })}
                minimumTrackTintColor={CyberpunkColors.cyan}
                maximumTrackTintColor={CyberpunkColors.darkGray}
                thumbTintColor={CyberpunkColors.magenta}
                testID="settings-music-volume"
              />
            </View>
          )}

          {/* SFX Toggle */}
          <View style={styles.settingRow}>
            <ThemedText style={styles.settingLabel}>Sound Effects</ThemedText>
            <Pressable
              style={[
                styles.toggle,
                settings.sfxEnabled && styles.toggleActive,
              ]}
              onPress={() => updateSettings({ sfxEnabled: !settings.sfxEnabled })}
              testID="settings-sfx-toggle"
            >
              <View
                style={[
                  styles.toggleThumb,
                  settings.sfxEnabled && styles.toggleThumbActive,
                ]}
              />
            </Pressable>
          </View>

          {/* SFX Volume */}
          {settings.sfxEnabled && (
            <View style={styles.settingRow}>
              <ThemedText style={styles.settingLabel}>
                SFX Volume: {Math.round(settings.sfxVolume * 100)}%
              </ThemedText>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={1}
                value={settings.sfxVolume}
                onValueChange={(value) => updateSettings({ sfxVolume: value })}
                minimumTrackTintColor={CyberpunkColors.cyan}
                maximumTrackTintColor={CyberpunkColors.darkGray}
                thumbTintColor={CyberpunkColors.magenta}
                testID="settings-sfx-volume"
              />
            </View>
          )}
        </View>

        {/* Game Settings */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            🎮 GAME
          </ThemedText>

          <Pressable
            style={styles.dangerButton}
            onPress={handleReset}
            testID="settings-reset-button"
          >
            <ThemedText style={styles.dangerButtonText}>🔄 RESET GAME</ThemedText>
          </Pressable>
        </View>

        {/* About */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            ℹ️ ABOUT
          </ThemedText>
          <ThemedText style={styles.aboutText}>
            Habittus v1.0.0
          </ThemedText>
          <ThemedText style={styles.aboutText}>
            Cyberpunk Life RPG
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
  title: {
    fontSize: 32,
    color: CyberpunkColors.cyan,
    marginBottom: 24,
    textAlign: 'center',
    fontFamily: 'Courier New',
  },
  section: {
    backgroundColor: CyberpunkColors.cardBg,
    borderWidth: 2,
    borderColor: CyberpunkColors.cyan,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    color: CyberpunkColors.magenta,
    marginBottom: 16,
    fontFamily: 'Courier New',
  },
  settingRow: {
    marginBottom: 20,
  },
  settingLabel: {
    fontSize: 14,
    color: CyberpunkColors.textPrimary,
    marginBottom: 8,
    fontFamily: 'Courier New',
  },
  toggle: {
    width: 60,
    height: 30,
    borderRadius: 15,
    backgroundColor: CyberpunkColors.darkGray,
    borderWidth: 2,
    borderColor: CyberpunkColors.textDisabled,
    padding: 2,
    justifyContent: 'center',
  },
  toggleActive: {
    backgroundColor: CyberpunkColors.cyan,
    borderColor: CyberpunkColors.cyan,
  },
  toggleThumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: CyberpunkColors.textDisabled,
    alignSelf: 'flex-start',
  },
  toggleThumbActive: {
    backgroundColor: CyberpunkColors.magenta,
    alignSelf: 'flex-end',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  dangerButton: {
    backgroundColor: CyberpunkColors.error,
    borderWidth: 2,
    borderColor: CyberpunkColors.red,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  dangerButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: CyberpunkColors.textPrimary,
    fontFamily: 'Courier New',
  },
  aboutText: {
    fontSize: 12,
    color: CyberpunkColors.textSecondary,
    marginBottom: 4,
    textAlign: 'center',
    fontFamily: 'Courier New',
  },
});
