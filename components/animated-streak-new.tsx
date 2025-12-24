import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { ThemedText } from './themed-text';
import { CyberpunkColors } from '@/constants/theme';

interface AnimatedStreakProps {
  streak: number;
  bonus: number;
}

export function AnimatedStreak({ streak, bonus }: AnimatedStreakProps) {
  const scale = useSharedValue(1);
  const glowOpacity = useSharedValue(0.5);

  useEffect(() => {
    // Scale animation
    scale.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 500, easing: Easing.ease }),
        withTiming(1, { duration: 500, easing: Easing.ease })
      ),
      -1
    );

    // Glow animation
    glowOpacity.value = withRepeat(
      withTiming(1, {
        duration: 1500,
        easing: Easing.inOut(Easing.sin),
      }),
      -1,
      true
    );
  }, []);

  const scaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.glow, glowStyle]} />
      <Animated.View style={[styles.streakBox, scaleStyle]}>
        <ThemedText style={styles.value}>{streak}</ThemedText>
        <ThemedText style={styles.label}>DIAS</ThemedText>
      </Animated.View>
      <View style={styles.bonusBox}>
        <ThemedText style={styles.bonusText}>{Math.round(bonus * 100)}% OFF</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 24,
  },
  glow: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: CyberpunkColors.orange,
    shadowColor: CyberpunkColors.orange,
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 10,
  },
  streakBox: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: CyberpunkColors.cardBg,
    borderWidth: 3,
    borderColor: CyberpunkColors.orange,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: CyberpunkColors.orange,
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 15,
  },
  value: {
    fontSize: 48,
    fontWeight: 'bold',
    color: CyberpunkColors.orange,
    fontFamily: 'Courier New',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: CyberpunkColors.cyan,
    fontFamily: 'Courier New',
    marginTop: 4,
  },
  bonusBox: {
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: CyberpunkColors.inputBg,
    borderWidth: 2,
    borderColor: CyberpunkColors.purple,
    borderRadius: 4,
  },
  bonusText: {
    fontSize: 12,
    color: CyberpunkColors.purple,
    fontWeight: 'bold',
    fontFamily: 'Courier New',
  },
});
