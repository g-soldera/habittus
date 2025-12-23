/**
 * ParticleExplosion - Efeito de partículas ao completar gig
 * Usa reanimated para animações performáticas
 */

import { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import { CyberpunkColors } from '@/constants/theme';

interface ParticleProps {
  x: number;
  y: number;
  color: string;
  delay: number;
  onComplete?: () => void;
}

function Particle({ x, y, color, delay, onComplete }: ParticleProps) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);

  useEffect(() => {
    translateX.value = withDelay(
      delay,
      withTiming(x, { duration: 800, easing: Easing.out(Easing.cubic) })
    );
    translateY.value = withDelay(
      delay,
      withTiming(y, { duration: 800, easing: Easing.out(Easing.cubic) })
    );
    opacity.value = withDelay(
      delay,
      withTiming(0, { duration: 800, easing: Easing.out(Easing.ease) }, (finished) => {
        if (finished && onComplete) {
          runOnJS(onComplete)();
        }
      })
    );
    scale.value = withDelay(
      delay,
      withTiming(0.5, { duration: 800, easing: Easing.out(Easing.ease) })
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        styles.particle,
        {
          backgroundColor: color,
        },
        animatedStyle,
      ]}
    />
  );
}

interface ParticleExplosionProps {
  x: number; // posição X do centro
  y: number; // posição Y do centro
  particleCount?: number;
  colors?: string[];
  onComplete?: () => void;
}

export function ParticleExplosion({
  x,
  y,
  particleCount = 20,
  colors = [
    CyberpunkColors.cyan,
    CyberpunkColors.magenta,
    CyberpunkColors.green,
    CyberpunkColors.yellow,
    CyberpunkColors.purple,
  ],
  onComplete,
}: ParticleExplosionProps) {
  const completedCount = useRef(0);

  const handleParticleComplete = () => {
    completedCount.current += 1;
    if (completedCount.current === particleCount && onComplete) {
      onComplete();
    }
  };

  const particles = Array.from({ length: particleCount }).map((_, i) => {
    const angle = (i / particleCount) * Math.PI * 2;
    const distance = 50 + Math.random() * 100;
    const targetX = Math.cos(angle) * distance;
    const targetY = Math.sin(angle) * distance;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const delay = Math.random() * 100;

    return (
      <Particle
        key={i}
        x={targetX}
        y={targetY}
        color={color}
        delay={delay}
        onComplete={handleParticleComplete}
      />
    );
  });

  return (
    <View
      style={[
        styles.container,
        {
          left: x,
          top: y,
        },
      ]}
      pointerEvents="none"
    >
      {particles}
    </View>
  );
}

/**
 * SuccessFlash - Flash de sucesso ao completar gig
 */
interface SuccessFlashProps {
  onComplete?: () => void;
}

export function SuccessFlash({ onComplete }: SuccessFlashProps) {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 100 }, () => {
      opacity.value = withTiming(0, { duration: 500 }, (finished) => {
        if (finished && onComplete) {
          runOnJS(onComplete)();
        }
      });
    });
    scale.value = withTiming(1.2, { duration: 600, easing: Easing.out(Easing.cubic) });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.flash, animatedStyle]} pointerEvents="none">
      <View style={styles.flashInner} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 0,
    height: 0,
    zIndex: 1000,
  },
  particle: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    shadowColor: '#fff',
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  flash: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  flashInner: {
    width: '100%',
    height: '100%',
    backgroundColor: CyberpunkColors.green,
    opacity: 0.3,
  },
});
