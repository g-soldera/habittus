import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CyberpunkGrid } from '@/components/cyberpunk-grid';
import { CyberpunkOverlay } from '@/components/cyberpunk-overlay';
import { Jukebox } from '@/components/jukebox';

/**
 * Página de música/Jukebox
 * Phase 7 - Reprodução de áudio com playlist
 */
export default function MusicScreen() {
  const insets = useSafeAreaInsets();

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
      <CyberpunkGrid />
      <CyberpunkOverlay />
      
      <Jukebox />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
