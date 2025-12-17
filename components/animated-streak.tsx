import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { StyleSheet, View } from "react-native";
import { useEffect } from "react";

import { ThemedText } from "@/components/themed-text";
import { CyberpunkColors } from "@/constants/theme";

interface AnimatedStreakProps {
  streak: number;
}

export function AnimatedStreak({ streak }: AnimatedStreakProps) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(
      withTiming(1.1, {
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );

    opacity.value = withRepeat(
      withTiming(0.7, {
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.streakBox}>
        <ThemedText style={styles.streakLabel}>STREAK</ThemedText>
        <ThemedText style={styles.streakValue}>{streak}</ThemedText>
        <ThemedText style={styles.streakDays}>dias</ThemedText>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  streakBox: {
    backgroundColor: CyberpunkColors.cardBg,
    borderWidth: 2,
    borderColor: CyberpunkColors.magenta,
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    shadowColor: CyberpunkColors.magenta,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  streakLabel: {
    fontSize: 11,
    color: CyberpunkColors.textSecondary,
    marginBottom: 4,
    fontFamily: "Courier New",
  },
  streakValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: CyberpunkColors.magenta,
    fontFamily: "Courier New",
  },
  streakDays: {
    fontSize: 10,
    color: CyberpunkColors.textSecondary,
    marginTop: 2,
    fontFamily: "Courier New",
  },
});
