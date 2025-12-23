import { View, StyleSheet } from "react-native";
import { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { ThemedText } from "./themed-text";
import { CyberpunkColors } from "@/constants/theme";
import { BioMonitor } from "@/types";

interface BioMonitorProps {
  stats: BioMonitor;
}

export function BioMonitorComponent({ stats }: BioMonitorProps) {
  const StatBar = ({ label, value, color }: { label: string; value: number; color: string }) => {
    const animatedWidth = useSharedValue(0);

    useEffect(() => {
      animatedWidth.value = withSpring(value, { damping: 5, mass: 1 });
    }, [value]);

    const animatedStyle = useAnimatedStyle(() => ({
      width: `${Math.min(animatedWidth.value, 100)}%`,
    }));

    const id = `bio-stat-${label.toLowerCase()}`;
    return (
      <View
        style={styles.statContainer}
        testID={`${id}-container`}
        accessible
        accessibilityLabel={`${label} ${value}%`}
        accessibilityValue={{ min: 0, now: value, max: 100 }}
      >
        <View style={styles.statHeader}>
          <ThemedText style={styles.statLabel} testID={`${id}-label`}>
            {label}
          </ThemedText>
          <ThemedText style={[styles.statValue, { color }]} testID={`${id}-value`}>
            {value}%
          </ThemedText>
        </View>
        <View style={styles.barBackground} testID={`${id}-bar-bg`}>
          <Animated.View
            style={[
              styles.barFill,
              {
                backgroundColor: color,
              },
              animatedStyle,
            ]}
            testID={`${id}-bar-fill`}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container} testID="bio-monitor" accessible accessibilityRole="summary" accessibilityLabel="Bio Monitor">
      <ThemedText type="subtitle" style={styles.title} testID="bio-monitor-title">
        BIO-MONITOR
      </ThemedText>

      <StatBar label="RAM" value={stats.ram} color={CyberpunkColors.cyan} />
      <StatBar label="HARDWARE" value={stats.hardware} color={CyberpunkColors.green} />
      <StatBar label="COOL" value={stats.cool} color={CyberpunkColors.magenta} />

      {/* Credits display */}
      <View style={styles.creditsContainer} testID="bio-credits-container" accessible accessibilityLabel={`Credits ${stats.credits}`}>
        <ThemedText style={styles.creditsLabel} testID="bio-credits-label">
          CREDITS
        </ThemedText>
        <ThemedText style={styles.creditsValue} testID="bio-credits-value">
          {stats.credits}
        </ThemedText>
      </View>

      {/* XP and Gold display */}
      <View style={styles.statsRow} testID="bio-stats-row">
        <View style={styles.statBox} testID="bio-xp-box" accessible accessibilityLabel={`XP ${stats.totalXp}`}>
          <ThemedText style={styles.statBoxLabel} testID="bio-xp-label">
            XP
          </ThemedText>
          <ThemedText style={styles.statBoxValue} testID="bio-xp-value">
            {stats.totalXp}
          </ThemedText>
        </View>
        <View style={styles.statBox} testID="bio-gold-box" accessible accessibilityLabel={`Gold ${stats.totalGold}`}>
          <ThemedText style={styles.statBoxLabel} testID="bio-gold-label">
            GOLD
          </ThemedText>
          <ThemedText style={styles.statBoxValue} testID="bio-gold-value">
            {stats.totalGold}
          </ThemedText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: CyberpunkColors.cardBg,
    borderWidth: 2,
    borderColor: CyberpunkColors.cyan,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    color: CyberpunkColors.cyan,
    marginBottom: 16,
    fontFamily: "Courier New",
  },
  statContainer: {
    marginBottom: 12,
  },
  statHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: CyberpunkColors.textSecondary,
    fontFamily: "Courier New",
  },
  statValue: {
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "Courier New",
  },
  barBackground: {
    height: 8,
    backgroundColor: CyberpunkColors.inputBg,
    borderRadius: 4,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: 4,
  },
  creditsContainer: {
    backgroundColor: CyberpunkColors.inputBg,
    borderWidth: 1,
    borderColor: CyberpunkColors.magenta,
    borderRadius: 4,
    padding: 12,
    marginVertical: 12,
    alignItems: "center",
  },
  creditsLabel: {
    fontSize: 12,
    color: CyberpunkColors.textSecondary,
    fontFamily: "Courier New",
  },
  creditsValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: CyberpunkColors.magenta,
    fontFamily: "Courier New",
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: CyberpunkColors.inputBg,
    borderWidth: 1,
    borderColor: CyberpunkColors.purple,
    borderRadius: 4,
    padding: 12,
    alignItems: "center",
  },
  statBoxLabel: {
    fontSize: 11,
    color: CyberpunkColors.textSecondary,
    marginBottom: 4,
    fontFamily: "Courier New",
  },
  statBoxValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: CyberpunkColors.purple,
    fontFamily: "Courier New",
  },
});
