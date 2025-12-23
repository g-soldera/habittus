import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from './themed-text';
import { CyberpunkColors } from '@/constants/theme';
import type { ClassWarning } from '@/hooks/use-class-warnings';

interface ClassWarningsProps {
  warnings: ClassWarning[];
}

export function ClassWarningsPanel({ warnings }: ClassWarningsProps) {
  if (warnings.length === 0) return null;

  return (
    <View style={styles.container} testID="class-warnings">
      {warnings.map((warning, idx) => (
        <View
          key={idx}
          style={[
            styles.warningItem,
            {
              borderColor:
                warning.severity === 'critical'
                  ? CyberpunkColors.red
                  : warning.severity === 'warning'
                  ? CyberpunkColors.orange
                  : CyberpunkColors.cyan,
              backgroundColor:
                warning.severity === 'critical'
                  ? 'rgba(255, 0, 0, 0.1)'
                  : warning.severity === 'warning'
                  ? 'rgba(255, 165, 0, 0.1)'
                  : 'rgba(0, 255, 255, 0.05)',
            },
          ]}
          testID={`warning-${warning.type}`}
          accessible
          accessibilityLabel={warning.message}
          accessibilityRole="alert"
        >
          <ThemedText
            style={[
              styles.warningText,
              {
                color:
                  warning.severity === 'critical'
                    ? CyberpunkColors.red
                    : warning.severity === 'warning'
                    ? CyberpunkColors.orange
                    : CyberpunkColors.cyan,
              },
            ]}
          >
            {warning.message}
          </ThemedText>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    marginVertical: 12,
  },
  warningItem: {
    borderWidth: 2,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  warningText: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Courier New',
  },
});
