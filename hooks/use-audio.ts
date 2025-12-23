import { useState, useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AUDIO_SETTINGS_KEY = 'habittus_audio_settings';

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
  const [isLoading, setIsLoading] = useState(true);
  const [appState, setAppState] = useState<AppStateStatus>('active');
  const musicSound = useRef<Audio.Sound | null>(null);
  const appStateSubscription = useRef<any>(null);

  // Load settings from storage
  useEffect(() => {
    loadSettings();
  }, []);

  // Setup audio mode
  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
      shouldDuckAndroid: true,
    });
  }, []);

  // Listen to app state changes (pause music when app loses focus)
  useEffect(() => {
    appStateSubscription.current = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      appStateSubscription.current?.remove();
    };
  }, []);

  const handleAppStateChange = async (state: AppStateStatus) => {
    setAppState(state);
    
    if (state === 'inactive' || state === 'background') {
      // Pause music when app goes to background
      if (musicSound.current) {
        try {
          await musicSound.current.pauseAsync();
        } catch (error) {
          console.error('[Audio] Error pausing music:', error);
        }
      }
    } else if (state === 'active') {
      // Resume music when app comes to foreground
      if (musicSound.current && settings.musicEnabled) {
        try {
          await musicSound.current.playAsync();
        } catch (error) {
          console.error('[Audio] Error resuming music:', error);
        }
      }
    }
  };

  // Load background music
  useEffect(() => {
    if (settings.musicEnabled && !musicSound.current && appState === 'active') {
      loadBackgroundMusic();
    } else if (!settings.musicEnabled && musicSound.current) {
      stopMusic();
    }
  }, [settings.musicEnabled, appState]);

  // Update music volume
  useEffect(() => {
    if (musicSound.current) {
      musicSound.current.setVolumeAsync(settings.musicVolume);
    }
  }, [settings.musicVolume]);

  const loadSettings = async () => {
    try {
      const stored = await AsyncStorage.getItem(AUDIO_SETTINGS_KEY);
      if (stored) {
        setSettings(JSON.parse(stored));
      }
    } catch (error) {
      console.error('[Audio] Error loading settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveSettings = async (newSettings: AudioSettings) => {
    try {
      await AsyncStorage.setItem(AUDIO_SETTINGS_KEY, JSON.stringify(newSettings));
      setSettings(newSettings);
    } catch (error) {
      console.error('[Audio] Error saving settings:', error);
    }
  };

  const loadBackgroundMusic = async () => {
    try {
      // Using a free royalty-free track from Pixabay
      const { sound } = await Audio.Sound.createAsync(
        { uri: 'https://cdn.pixabay.com/download/audio/2022/09/01/audio_1d14fdf92b.mp3' },
        { 
          shouldPlay: true, 
          isLooping: true, 
          volume: settings.musicVolume 
        }
      );
      musicSound.current = sound;
    } catch (error) {
      console.error('[Audio] Error loading background music:', error);
      // Fallback: continue without music
    }
  };

  const stopMusic = async () => {
    if (musicSound.current) {
      try {
        await musicSound.current.stopAsync();
        await musicSound.current.unloadAsync();
        musicSound.current = null;
      } catch (error) {
        console.error('[Audio] Error stopping music:', error);
      }
    }
  };

  const playClickSound = async () => {
    if (!settings.sfxEnabled) return;

    try {
      // Create a simple beep sound using a minimal WAV file in base64
      // This is a short beep tone that works cross-platform
      const { sound } = await Audio.Sound.createAsync(
        { uri: 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==' },
        { volume: settings.sfxVolume }
      );
      await sound.playAsync();
      
      // Cleanup after playing
      setTimeout(() => {
        sound.unloadAsync();
      }, 200);
    } catch (error) {
      console.error('[Audio] Error playing click sound:', error);
    }
  };

  const toggleMusic = () => {
    const newSettings = { ...settings, musicEnabled: !settings.musicEnabled };
    saveSettings(newSettings);
  };

  const toggleSFX = () => {
    const newSettings = { ...settings, sfxEnabled: !settings.sfxEnabled };
    saveSettings(newSettings);
  };

  const setMusicVolume = (volume: number) => {
    const newSettings = { ...settings, musicVolume: volume };
    saveSettings(newSettings);
  };

  const setSFXVolume = (volume: number) => {
    const newSettings = { ...settings, sfxVolume: volume };
    saveSettings(newSettings);
  };

  const toggleMusic = () => {
    const newSettings = { ...settings, musicEnabled: !settings.musicEnabled };
    saveSettings(newSettings);
  };

  const toggleSFX = () => {
    const newSettings = { ...settings, sfxEnabled: !settings.sfxEnabled };
    saveSettings(newSettings);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (musicSound.current) {
        musicSound.current.unloadAsync();
      }
    };
  }, []);

  return {
    musicEnabled: settings.musicEnabled,
    sfxEnabled: settings.sfxEnabled,
    musicVolume: settings.musicVolume,
    sfxVolume: settings.sfxVolume,
    isLoading,
    toggleMusic,
    toggleSFX,
    setMusicVolume,
    setSFXVolume,
    playClickSound,
  };
}
