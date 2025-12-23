import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CyberpunkColors } from '@/constants/theme';

/**
 * Decorative overlay that draws circuit lines and chip nodes.
 * Render behind content to enhance cyberpunk feel.
 */
export function CyberpunkOverlay() {
  return (
    <View pointerEvents="none" style={styles.container}>
      {/* Horizontal bus lines */}
      <View style={[styles.line, { top: 40, left: 0, right: 0 }]} />
      <View style={[styles.line, { top: 120, left: 0, right: 0 }]} />
      <View style={[styles.line, { bottom: 80, left: 0, right: 0 }]} />

      {/* Vertical traces */}
      <View style={[styles.vline, { left: 24, top: 0, bottom: 0 }]} />
      <View style={[styles.vline, { right: 24, top: 0, bottom: 0 }]} />

      {/* Chip nodes */}
      <View style={[styles.chip, { top: 30, left: 20 }]} />
      <View style={[styles.chip, { top: 110, right: 30 }]} />
      <View style={[styles.chip, { bottom: 70, left: 60 }]} />
      <View style={[styles.chip, { bottom: 50, right: 50 }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  line: {
    position: 'absolute',
    height: 1,
    backgroundColor: CyberpunkColors.purple,
    opacity: 0.25,
  },
  vline: {
    position: 'absolute',
    width: 1,
    backgroundColor: CyberpunkColors.cyan,
    opacity: 0.2,
  },
  chip: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 2,
    backgroundColor: CyberpunkColors.magenta,
    borderWidth: 1,
    borderColor: CyberpunkColors.cyan,
    shadowColor: CyberpunkColors.magenta,
    shadowOpacity: 0.6,
    shadowRadius: 6,
  },
});

export default CyberpunkOverlay;
