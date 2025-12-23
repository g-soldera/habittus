import { Audio } from 'expo-av';
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
  musicEnabled: true,
  sfxEnabled: true,
  musicVolume: 0.3,
  sfxVolume: 0.5,
};

export function useAudio() {
  const [settings, setSettings] = useState<AudioSettings>(DEFAULT_SETTINGS);
  const [backgroundMusic, setBackgroundMusic] = useState<Audio.Sound | null>(null);
  const [loading, setLoading] = useState(true);

  // Load settings
  useEffect(() => {
    loadSettings();
  }, []);

  // Setup audio mode
  useEffect(() => {
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
      shouldDuckAndroid: true,
    });
  }, []);

  // Load background music
  useEffect(() => {
    if (settings.musicEnabled && !backgroundMusic) {
      loadBackgroundMusic();
    } else if (!settings.musicEnabled && backgroundMusic) {
      backgroundMusic.stopAsync();
      backgroundMusic.unloadAsync();
      setBackgroundMusic(null);
    }
  }, [settings.musicEnabled]);

  // Update music volume
  useEffect(() => {
    if (backgroundMusic) {
      backgroundMusic.setVolumeAsync(settings.musicVolume);
    }
  }, [settings.musicVolume, backgroundMusic]);

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

  const loadBackgroundMusic = async () => {
    try {
      // Using a copyright-free cyberpunk/rock track from Free Music Archive
      // You can replace this with any public domain or licensed track
      const { sound } = await Audio.Sound.createAsync(
        { uri: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Dee_Yan-Key/Tales_of_the_Realm/Dee_Yan-Key_-_01_-_Cyberpunk_Moonlight.mp3' },
        { 
          shouldPlay: true, 
          isLooping: true, 
          volume: settings.musicVolume 
        }
      );
      setBackgroundMusic(sound);
    } catch (error) {
      console.error('[Audio] Error loading background music:', error);
    }
  };

  const playSFX = async (type: 'click' | 'success' | 'error' | 'purchase') => {
    if (!settings.sfxEnabled) return;

    try {
      // Using expo-haptics as fallback for sounds
      const Haptics = await import('expo-haptics');
      
      const hapticMap: Record<string, any> = {
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
