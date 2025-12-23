/**
 * CyberpunkGrid - Background animado com grid parallax
 * Grid dinâmico com efeito de profundidade e movimento
 */

import { useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { CyberpunkColors } from '@/constants/theme';

const { width, height } = Dimensions.get('window');

export function CyberpunkGrid() {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    // Movimento infinito de baixo para cima (parallax)
    translateY.value = withRepeat(
      withTiming(100, { duration: 10000, easing: Easing.linear }),
      -1,
      false
    );

    // Pulsação sutil
    opacity.value = withRepeat(
      withTiming(0.5, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  return (
    <View style={styles.container} pointerEvents="none">
      {/* Grid layers */}
      <Animated.View style={[styles.gridLayer, animatedStyle]}>
        {/* Linhas horizontais */}
        {Array.from({ length: 30 }).map((_, i) => (
          <View
            key={`h-${i}`}
            style={[
              styles.gridLine,
              {
                top: (i * height) / 15,
                width: '100%',
                height: 1,
              },
            ]}
          />
        ))}
        {/* Linhas verticais */}
        {Array.from({ length: 20 }).map((_, i) => (
          <View
            key={`v-${i}`}
            style={[
              styles.gridLine,
              {
                left: (i * width) / 10,
                width: 1,
                height: '200%',
              },
            ]}
          />
        ))}
      </Animated.View>

      {/* Glow spots nos cantos */}
      <View style={[styles.glow, styles.glowTopLeft]} />
      <View style={[styles.glow, styles.glowTopRight]} />
      <View style={[styles.glow, styles.glowBottomLeft]} />
      <View style={[styles.glow, styles.glowBottomRight]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    backgroundColor: CyberpunkColors.darkBg,
  },
  gridLayer: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.3,
  },
  gridLine: {
    position: 'absolute',
    backgroundColor: CyberpunkColors.cyan,
    opacity: 0.1,
  },
  glow: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    opacity: 0.15,
  },
  glowTopLeft: {
    top: -50,
    left: -50,
    backgroundColor: CyberpunkColors.purple,
  },
  glowTopRight: {
    top: -50,
    right: -50,
    backgroundColor: CyberpunkColors.cyan,
  },
  glowBottomLeft: {
    bottom: -50,
    left: -50,
    backgroundColor: CyberpunkColors.magenta,
  },
  glowBottomRight: {
    bottom: -50,
    right: -50,
    backgroundColor: CyberpunkColors.green,
  },
});
