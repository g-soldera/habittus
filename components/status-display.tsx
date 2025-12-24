import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';
import { CyberpunkColors } from '@/constants/theme';
import type { UserStats } from '@/types/biometric';

interface StatusDisplayProps {
  stats: UserStats;
  maxValue?: number;
}

/**
 * Displays 7 RPG stats as bars with labels and values.
 * Colors:
 * - Green (70+): High
 * - Yellow (30-69): Medium
 * - Red (<30): Low/Danger
 */
export function StatusDisplay({ stats, maxValue = 100 }: StatusDisplayProps) {
  const statEntries: Array<[keyof UserStats, string]> = [
    ['strength', 'Força'],
    ['agility', 'Agilidade'],
    ['constitution', 'Constituição'],
    ['intelligence', 'Inteligência'],
    ['wisdom', 'Sabedoria'],
    ['charisma', 'Carisma'],
    ['willpower', 'Vontade'],
  ];

  const getBarColor = (value: number) => {
    if (value >= 70) return CyberpunkColors.green;
    if (value >= 30) return CyberpunkColors.yellow;
    return CyberpunkColors.magenta;
  };

  const getAccessibilityLabel = (name: string, value: number) => {
    const percentage = Math.round((value / maxValue) * 100);
    return `${name}: ${value}/${maxValue} (${percentage}%)`;
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Status RPG
      </ThemedText>

      {statEntries.map(([key, label]) => {
        const value = stats[key];
        const percentage = (value / maxValue) * 100;
        const barColor = getBarColor(value);

        return (
          <View key={key} style={styles.statRow}>
            <ThemedText style={styles.statLabel}>{label}</ThemedText>
            <View style={styles.barContainer}>
              <View
                style={[
                  styles.barFill,
                  {
                    width: `${Math.min(percentage, 100)}%`,
                    backgroundColor: barColor,
                  },
                ]}
                accessible={true}
                accessibilityLabel={getAccessibilityLabel(label, value)}
                accessibilityRole="progressbar"
                accessibilityValue={{
                  min: 0,
                  max: maxValue,
                  now: value,
                }}
              />
            </View>
            <ThemedText style={styles.statValue}>
              {Math.round(value)}/{maxValue}
            </ThemedText>
          </View>
        );
      })}
    </ThemedView>
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
    fontSize: 18,
    color: CyberpunkColors.cyan,
    marginBottom: 12,
    fontFamily: 'Courier New',
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  statLabel: {
    fontSize: 12,
    color: CyberpunkColors.textSecondary,
    width: 100,
    fontFamily: 'Courier New',
  },
  barContainer: {
    flex: 1,
    height: 20,
    backgroundColor: CyberpunkColors.darkBg,
    borderWidth: 1,
    borderColor: CyberpunkColors.cyan,
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 3,
  },
  statValue: {
    fontSize: 12,
    color: CyberpunkColors.cyan,
    width: 50,
    textAlign: 'right',
    fontFamily: 'Courier New',
  },
});
