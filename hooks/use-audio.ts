import * as Haptics from 'expo-haptics';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SETTINGS_KEY = 'habittus_audio_settings';

interface AudioSettings {
  musicEnabled: boolean;
  sfxEnabled: boolean;
  musicVolume: number;
  sfxVolume: number;
}

const DEFAULT_SETTINGS: AudioSettings = {
  musicEnabled: false, // Disabled by default since expo-av is deprecated
  sfxEnabled: true,
  musicVolume: 0.3,
  sfxVolume: 0.5,
};

export function useAudio() {
  const [settings, setSettings] = useState<AudioSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  // Load settings
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const stored = await AsyncStorage.getItem(SETTINGS_KEY);
      if (stored) {
        setSettings(JSON.parse(stored));
      }
    } catch (error) {
      console.error('[Audio] Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async (newSettings: AudioSettings) => {
    try {
      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
      setSettings(newSettings);
    } catch (error) {
      console.error('[Audio] Error saving settings:', error);
    }
  };

  const playSFX = async (type: 'click' | 'success' | 'error' | 'purchase') => {
    if (!settings.sfxEnabled) return;

    try {
      const hapticMap = {
        click: Haptics.ImpactFeedbackStyle.Light,
        success: Haptics.ImpactFeedbackStyle.Medium,
        error: Haptics.NotificationFeedbackType.Error,
        purchase: Haptics.NotificationFeedbackType.Success,
      };

      if (type === 'error' || type === 'purchase') {
        await Haptics.notificationAsync(hapticMap[type]);
      } else {
        await Haptics.impactAsync(hapticMap[type]);
      }
    } catch (error) {
      console.log('[Audio] Haptic feedback not available');
    }
  };

  const updateSettings = (updates: Partial<AudioSettings>) => {
    const newSettings = { ...settings, ...updates };
    saveSettings(newSettings);
  };

  return {
    settings,
    updateSettings,
    playSFX,
    loading,
  };
}
