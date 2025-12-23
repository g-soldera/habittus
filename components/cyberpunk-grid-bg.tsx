import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { CyberpunkColors } from '@/constants/theme';

export function CyberpunkGridBg() {
  const opacity = useSharedValue(0.2);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0.4, {
        duration: 3000,
        easing: Easing.inOut(Easing.sin),
      }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.gridContainer}>
        {/* Renderizar grid de linhas */}
        {Array.from({ length: 12 }).map((_, i) => (
          <View key={`h-${i}`} style={styles.gridLineHorizontal} />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <View key={`v-${i}`} style={styles.gridLineVertical} />
        ))}
      </View>

      {/* Glow corners */}
      <View style={[styles.glowCorner, styles.cornerTL]} />
      <View style={[styles.glowCorner, styles.cornerTR]} />
      <View style={[styles.glowCorner, styles.cornerBL]} />
      <View style={[styles.glowCorner, styles.cornerBR]} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    pointerEvents: 'none',
  },
  gridContainer: {
    flex: 1,
    position: 'relative',
  },
  gridLineHorizontal: {
    height: 1,
    backgroundColor: CyberpunkColors.cyan,
    marginVertical: 'auto',
    opacity: 0.1,
  },
  gridLineVertical: {
    position: 'absolute',
    width: 1,
    height: '100%',
    backgroundColor: CyberpunkColors.cyan,
    opacity: 0.1,
  },
  glowCorner: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    opacity: 0.15,
  },
  cornerTL: {
    top: -50,
    left: -50,
    backgroundColor: CyberpunkColors.purple,
    shadowColor: CyberpunkColors.purple,
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 10,
  },
  cornerTR: {
    top: -50,
    right: -50,
    backgroundColor: CyberpunkColors.cyan,
    shadowColor: CyberpunkColors.cyan,
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 10,
  },
  cornerBL: {
    bottom: -50,
    left: -50,
    backgroundColor: CyberpunkColors.orange,
    shadowColor: CyberpunkColors.orange,
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 10,
  },
  cornerBR: {
    bottom: -50,
    right: -50,
    backgroundColor: CyberpunkColors.red,
    shadowColor: CyberpunkColors.red,
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 10,
  },
});
