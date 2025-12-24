import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { CyberpunkColors } from '@/constants/theme';
import * as Audio from 'expo-audio';

interface Track {
  id: string;
  title: string;
  artist: string;
  url: string;
  duration?: number;
  genre: 'cyberpunk' | 'synthwave' | 'chillwave' | 'focus';
}

/**
 * Jukebox para reprodução de música de fundo
 * Phase 7 - Áudio real com playlist gerenciável
 */
export function Jukebox() {
  const [tracks] = useState<Track[]>([
    {
      id: '1',
      title: 'Neon Nights',
      artist: 'Cyberpunk Vibes',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      duration: 420,
      genre: 'cyberpunk',
    },
    {
      id: '2',
      title: 'Retro Future',
      artist: 'Synthwave Dreams',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      duration: 350,
      genre: 'synthwave',
    },
    {
      id: '3',
      title: 'Focus Mode',
      artist: 'Ambient Depths',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      duration: 480,
      genre: 'focus',
    },
    {
      id: '4',
      title: 'Chill Vibes',
      artist: 'Lo-Fi Beats',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
      duration: 380,
      genre: 'chillwave',
    },
  ]);

  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const soundRef = useRef<Audio.Sound | null>(null);

  const formatTime = (seconds?: number) => {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const playTrack = async (track: Track) => {
    try {
      setIsLoading(true);

      // Parar faixa anterior se existir
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
      }

      // Carregar nova faixa usando expo-audio
      const sound = new Audio.Sound();
      await sound.loadAsync({ uri: track.url });
      soundRef.current = sound;

      // Configurar volume e reproduzir
      await soundRef.current.setVolumeAsync(0.7);
      await soundRef.current.playAsync();

      setCurrentTrack(track);
      setIsPlaying(true);

      // Limpar quando terminar
      soundRef.current.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          playNextTrack();
        }
      });
    } catch (error) {
      console.log('Erro ao reproduzir:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePlayPause = async () => {
    if (!soundRef.current || !currentTrack) return;

    try {
      if (isPlaying) {
        await soundRef.current.pauseAsync();
        setIsPlaying(false);
      } else {
        await soundRef.current.playAsync();
        setIsPlaying(true);
      }
    } catch (error) {
      console.log('Erro ao pausar/retomar:', error);
    }
  };

  const playNextTrack = () => {
    if (!currentTrack) return;

    const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id);
    const nextTrack = tracks[(currentIndex + 1) % tracks.length];
    playTrack(nextTrack);
  };

  const playPreviousTrack = () => {
    if (!currentTrack) return;

    const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id);
    const prevTrack = tracks[(currentIndex - 1 + tracks.length) % tracks.length];
    playTrack(prevTrack);
  };

  useEffect(() => {
    // Autoplay primeira música ao carregar
    if (tracks.length > 0 && !currentTrack) {
      playTrack(tracks[0]);
    }

    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  const genreColors = {
    cyberpunk: CyberpunkColors.cyan,
    synthwave: CyberpunkColors.magenta,
    chillwave: CyberpunkColors.green,
    focus: CyberpunkColors.purple,
  };

  const genreLabels = {
    cyberpunk: 'CYBERPUNK',
    synthwave: 'SYNTHWAVE',
    chillwave: 'CHILLWAVE',
    focus: 'FOCUS',
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Jukebox Cyberpunk</ThemedText>

      {/* Now Playing */}
      {currentTrack ? (
        <View style={styles.nowPlayingContainer}>
          <View style={styles.nowPlayingContent}>
            <ThemedText style={styles.nowPlayingLabel}>REPRODUZINDO AGORA</ThemedText>
            <ThemedText style={styles.trackTitle}>{currentTrack.title}</ThemedText>
            <ThemedText style={styles.trackArtist}>{currentTrack.artist}</ThemedText>

            <View
              style={[
                styles.genreBadge,
                { borderColor: genreColors[currentTrack.genre] },
              ]}
            >
              <ThemedText
                style={[
                  styles.genreLabel,
                  { color: genreColors[currentTrack.genre] },
                ]}
              >
                {genreLabels[currentTrack.genre]}
              </ThemedText>
            </View>
          </View>

          {/* Controls */}
          <View style={styles.controlsContainer}>
            <Pressable
              onPress={playPreviousTrack}
              style={styles.controlButton}
              disabled={isLoading}
            >
              <ThemedText style={styles.controlIcon}>⏮</ThemedText>
            </Pressable>

            <Pressable
              onPress={togglePlayPause}
              style={styles.playButton}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={CyberpunkColors.cyan} size="small" />
              ) : (
                <ThemedText style={styles.playIcon}>
                  {isPlaying ? '⏸' : '▶'}
                </ThemedText>
              )}
            </Pressable>

            <Pressable
              onPress={playNextTrack}
              style={styles.controlButton}
              disabled={isLoading}
            >
              <ThemedText style={styles.controlIcon}>⏭</ThemedText>
            </Pressable>
          </View>
        </View>
      ) : (
        <View style={styles.emptyStateContainer}>
          <ThemedText style={styles.emptyStateEmoji}>🎶</ThemedText>
          <ThemedText style={styles.emptyStateText}>
            Selecione uma faixa para começar
          </ThemedText>
        </View>
      )}

      {/* Playlist */}
      <ThemedText style={styles.playlistTitle}>PLAYLIST</ThemedText>
      <ScrollView style={styles.playlist} showsVerticalScrollIndicator={false}>
        {tracks.map((track, index) => (
          <Pressable
            key={track.id}
            onPress={() => playTrack(track)}
            style={[
              styles.trackItem,
              currentTrack?.id === track.id && styles.trackItemActive,
            ]}
            disabled={isLoading}
            accessibilityRole="button"
            accessibilityLabel={`${track.title} por ${track.artist}`}
          >
            <ThemedText style={styles.trackIndex}>
              {currentTrack?.id === track.id ? '▶' : index + 1}
            </ThemedText>

            <View style={styles.trackInfo}>
              <ThemedText
                style={[
                  styles.trackName,
                  currentTrack?.id === track.id && styles.trackNameActive,
                ]}
              >
                {track.title}
              </ThemedText>
              <ThemedText style={styles.trackMeta}>
                {track.artist} · {formatTime(track.duration)}
              </ThemedText>
            </View>

            <View
              style={[
                styles.genreDot,
                { backgroundColor: genreColors[track.genre] },
              ]}
            />
          </Pressable>
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: CyberpunkColors.cyan,
    textShadowColor: CyberpunkColors.cyan,
    textShadowRadius: 4,
  },
  nowPlayingContainer: {
    backgroundColor: CyberpunkColors.inputBg,
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: CyberpunkColors.cyan,
    gap: 16,
  },
  nowPlayingContent: {
    gap: 8,
  },
  nowPlayingLabel: {
    fontSize: 11,
    color: CyberpunkColors.textSecondary,
    fontWeight: '600',
    letterSpacing: 1,
  },
  trackTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: CyberpunkColors.cyan,
  },
  trackArtist: {
    fontSize: 13,
    color: CyberpunkColors.textSecondary,
  },
  genreBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  genreEmoji: {
    fontSize: 16,
  },
  genreLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  controlButton: {
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: CyberpunkColors.darkGray,
  },
  controlIcon: {
    fontSize: 24,
    color: CyberpunkColors.cyan,
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: CyberpunkColors.cyan,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: CyberpunkColors.cyan,
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 8,
  },
  playIcon: {
    fontSize: 28,
    color: CyberpunkColors.black,
    fontWeight: 'bold',
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    gap: 12,
  },
  emptyStateEmoji: {
    fontSize: 48,
  },
  emptyStateText: {
    fontSize: 14,
    color: CyberpunkColors.textSecondary,
  },
  playlistTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: CyberpunkColors.textSecondary,
    letterSpacing: 1,
  },
  playlist: {
    flex: 1,
  },
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 6,
    borderRadius: 6,
    backgroundColor: CyberpunkColors.inputBg,
    borderWidth: 1,
    borderColor: CyberpunkColors.darkGray,
    gap: 12,
  },
  trackItemActive: {
    borderColor: CyberpunkColors.magenta,
    backgroundColor: `${CyberpunkColors.magenta}20`,
  },
  trackIndex: {
    fontSize: 12,
    fontWeight: 'bold',
    color: CyberpunkColors.textSecondary,
    minWidth: 24,
    textAlign: 'center',
  },
  trackInfo: {
    flex: 1,
    gap: 2,
  },
  trackName: {
    fontSize: 13,
    fontWeight: '600',
    color: CyberpunkColors.textPrimary,
  },
  trackNameActive: {
    color: CyberpunkColors.magenta,
  },
  trackMeta: {
    fontSize: 11,
    color: CyberpunkColors.textSecondary,
  },
  genreDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});

export default Jukebox;
