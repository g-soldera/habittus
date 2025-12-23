/**
 * Cyberpunk Visual Effects Components
 * Efeitos visuais avançados para melhorar a estética cyberpunk
 */

import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { CyberpunkColors } from '@/constants/theme';

/**
 * GlitchText - Efeito de glitch em texto
 */
interface GlitchTextProps {
  children: React.ReactNode;
  intensity?: number; // 1-10
}

export function GlitchText({ children, intensity = 5 }: GlitchTextProps) {
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);

  useEffect(() => {
    const duration = 3000 / intensity;
    offsetX.value = withRepeat(
      withSequence(
        withTiming(2, { duration: 50 }),
        withTiming(-2, { duration: 50 }),
        withTiming(0, { duration: 50 })
      ),
      -1,
      false
    );

    offsetY.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 30 }),
        withTiming(-1, { duration: 30 }),
        withTiming(0, { duration: 30 })
      ),
      -1,
      false
    );
  }, [intensity]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: offsetX.value },
      { translateY: offsetY.value },
    ],
  }));

  return (
    <View style={styles.glitchContainer}>
      <Animated.View style={animatedStyle}>{children}</Animated.View>
    </View>
  );
}

/**
 * NeonBorder - Borda com efeito neon pulsante
 */
interface NeonBorderProps {
  children: React.ReactNode;
  color?: string;
  width?: number;
  intensity?: number;
}

export function NeonBorder({
  children,
  color = CyberpunkColors.cyan,
  width = 2,
  intensity = 10,
}: NeonBorderProps) {
  const glowOpacity = useSharedValue(0.5);

  useEffect(() => {
    glowOpacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.5, { duration: 1000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    shadowOpacity: glowOpacity.value,
    shadowColor: color,
    shadowRadius: intensity,
    shadowOffset: { width: 0, height: 0 },
  }));

  return (
    <Animated.View
      style={[
        styles.neonBorder,
        {
          borderColor: color,
          borderWidth: width,
        },
        animatedStyle,
      ]}
    >
      {children}
    </Animated.View>
  );
}

/**
 * ScanlineOverlay - Overlay com linhas de varredura
 */
export function ScanlineOverlay() {
  const translateY = useSharedValue(-100);

  useEffect(() => {
    translateY.value = withRepeat(
      withTiming(100, { duration: 3000, easing: Easing.linear }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: `${translateY.value}%` }],
  }));

  return (
    <View style={styles.scanlineContainer} pointerEvents="none">
      <Animated.View style={[styles.scanline, animatedStyle]} />
    </View>
  );
}

/**
 * PulseEffect - Efeito de pulso para enfatizar elementos
 */
interface PulseEffectProps {
  children: React.ReactNode;
  scale?: number;
  duration?: number;
}

export function PulseEffect({ children, scale = 1.05, duration = 1000 }: PulseEffectProps) {
  const scaleValue = useSharedValue(1);

  useEffect(() => {
    scaleValue.value = withRepeat(
      withSequence(
        withTiming(scale, { duration: duration / 2, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: duration / 2, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, [scale, duration]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleValue.value }],
  }));

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
}

/**
 * FadeIn - Animação de fade in
 */
interface FadeInProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
}

export function FadeIn({ children, duration = 500, delay = 0 }: FadeInProps) {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration,
      easing: Easing.inOut(Easing.ease),
    });
  }, [duration]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
}

/**
 * SlideIn - Animação de entrada deslizando
 */
interface SlideInProps {
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'top' | 'bottom';
  duration?: number;
  distance?: number;
}

export function SlideIn({
  children,
  direction = 'bottom',
  duration = 500,
  distance = 50,
}: SlideInProps) {
  const translateX = useSharedValue(direction === 'left' ? -distance : direction === 'right' ? distance : 0);
  const translateY = useSharedValue(direction === 'top' ? -distance : direction === 'bottom' ? distance : 0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateX.value = withTiming(0, { duration, easing: Easing.out(Easing.ease) });
    translateY.value = withTiming(0, { duration, easing: Easing.out(Easing.ease) });
    opacity.value = withTiming(1, { duration, easing: Easing.out(Easing.ease) });
  }, [duration]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    opacity: opacity.value,
  }));

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
}

const styles = StyleSheet.create({
  glitchContainer: {
    position: 'relative',
  },
  neonBorder: {
    borderRadius: 4,
  },
  scanlineContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  scanline: {
    position: 'absolute',
    width: '100%',
    height: 2,
    backgroundColor: CyberpunkColors.cyan,
    opacity: 0.3,
  },
});
