import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { CyberpunkColors } from '@/constants/theme';

interface GlitchTextProps {
  children: React.ReactNode;
  intensity?: number;
}

export function GlitchText({ children, intensity = 2 }: GlitchTextProps) {
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const glitchOpacity = useSharedValue(0);

  useEffect(() => {
    offsetX.value = withSequence(
      withTiming(intensity, { duration: 100, easing: Easing.ease }),
      withTiming(-intensity, { duration: 100, easing: Easing.ease }),
      withTiming(0, { duration: 100, easing: Easing.ease })
    );

    offsetY.value = withDelay(
      50,
      withSequence(
        withTiming(intensity / 2, { duration: 75, easing: Easing.ease }),
        withTiming(-intensity / 2, { duration: 75, easing: Easing.ease }),
        withTiming(0, { duration: 75, easing: Easing.ease })
      )
    );

    glitchOpacity.value = withSequence(
      withTiming(0.8, { duration: 50 }),
      withTiming(0, { duration: 50 })
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offsetX.value }, { translateY: offsetY.value }],
  }));

  const glitchLayer1 = useAnimatedStyle(() => ({
    opacity: glitchOpacity.value,
    position: 'absolute',
    color: CyberpunkColors.cyan,
    transform: [{ translateX: offsetX.value + 2 }],
  }));

  const glitchLayer2 = useAnimatedStyle(() => ({
    opacity: glitchOpacity.value * 0.6,
    position: 'absolute',
    color: CyberpunkColors.magenta,
    transform: [{ translateX: offsetX.value - 2 }],
  }));

  return (
    <Animated.Text style={[animatedStyle]}>
      {children}
      <Animated.Text style={glitchLayer1}>{children}</Animated.Text>
      <Animated.Text style={glitchLayer2}>{children}</Animated.Text>
    </Animated.Text>
  );
}

interface NeonBorderProps {
  children: React.ReactNode;
  color?: string;
}

export function NeonBorder({ children, color = CyberpunkColors.cyan }: NeonBorderProps) {
  const glowIntensity = useSharedValue(0.5);

  useEffect(() => {
    glowIntensity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.sin) }),
        withTiming(0.5, { duration: 1500, easing: Easing.inOut(Easing.sin) })
      ),
      -1
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    shadowOpacity: glowIntensity.value,
    shadowRadius: 10 * glowIntensity.value,
  }));

  return (
    <Animated.View
      style={[
        styles.neonBorder,
        {
          borderColor: color,
          shadowColor: color,
        },
        animatedStyle,
      ]}
    >
      {children}
    </Animated.View>
  );
}

interface ScanlineOverlayProps {
  intensity?: number;
}

export function ScanlineOverlay({ intensity = 0.08 }: ScanlineOverlayProps) {
  const offsetY = useSharedValue(0);

  useEffect(() => {
    offsetY.value = withRepeat(
      withTiming(100, {
        duration: 4000,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: offsetY.value }],
  }));

  return (
    <Animated.View style={[styles.scanlineContainer, animatedStyle]}>
      {Array.from({ length: 100 }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.scanline,
            {
              opacity: intensity,
            },
          ]}
        />
      ))}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  neonBorder: {
    borderWidth: 2,
    borderRadius: 4,
    shadowOffset: { width: 0, height: 0 },
    elevation: 5,
  },
  scanlineContainer: {
    ...StyleSheet.absoluteFillObject,
    pointerEvents: 'none',
  },
  scanline: {
    height: 1,
    backgroundColor: '#000',
    marginVertical: 1,
  },
});
