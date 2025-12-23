import { useState, useEffect, useRef } from 'react';
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
  const musicSound = useRef<Audio.Sound | null>(null);
  const clickSound = useRef<Audio.Sound | null>(null);

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

  // Load background music
  useEffect(() => {
    if (settings.musicEnabled && !musicSound.current) {
      loadBackgroundMusic();
    } else if (!settings.musicEnabled && musicSound.current) {
      stopMusic();
    }
  }, [settings.musicEnabled]);

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
      // Using a free cyberpunk/synthwave track from Pixabay or similar
      // For now, using a placeholder URL - you'll need to add actual music file
      const { sound } = await Audio.Sound.createAsync(
        { uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
        { 
          shouldPlay: true, 
          isLooping: true, 
          volume: settings.musicVolume 
        }
      );
      musicSound.current = sound;
    } catch (error) {
      console.error('[Audio] Error loading background music:', error);
    }
  };

  const stopMusic = async () => {
    if (musicSound.current) {
      await musicSound.current.stopAsync();
      await musicSound.current.unloadAsync();
      musicSound.current = null;
    }
  };

  const loadClickSound = async () => {
    if (!clickSound.current) {
      try {
        // Using a free click sound - replace with actual cyberpunk click sound
        const { sound } = await Audio.Sound.createAsync(
          require('@/assets/sounds/click.mp3'),
          { volume: settings.sfxVolume }
        );
        clickSound.current = sound;
      } catch (error) {
        console.error('[Audio] Error loading click sound:', error);
      }
    }
  };

  const playClickSound = async () => {
    if (!settings.sfxEnabled) return;

    try {
      await loadClickSound();
      if (clickSound.current) {
        await clickSound.current.replayAsync();
      }
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

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (musicSound.current) {
        musicSound.current.unloadAsync();
      }
      if (clickSound.current) {
        clickSound.current.unloadAsync();
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
