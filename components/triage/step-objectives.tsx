import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { CyberpunkColors } from '@/constants/theme';
import { CyberButton } from '@/components/cyber-button';
import type { Pillar } from '@/types/biometric';

export function TriageStepObjectives({
  objectives,
  toggleObjective,
  pillarOptions,
}: {
  objectives: Pillar[];
  toggleObjective: (p: Pillar) => void;
  pillarOptions: { label: string; value: Pillar }[];
}) {
  return (
    <ThemedView accessible={true}>
      <ThemedText type="title">Seus Objetivos 🎯</ThemedText>
      <ThemedText>Selecione os pilares da vida que deseja melhorar.</ThemedText>

      <View style={styles.objectivesGrid}>
        {pillarOptions.map(option => (
          <CyberButton
            key={option.value}
            testID={`triage-objective-${option.value}`}
            onPress={() => toggleObjective(option.value)}
            active={objectives.includes(option.value)}
            variant="secondary"
            size="md"
            fullWidth={true}
            style={styles.objectiveButton}
            accessibilityLabel={option.label}
          >
            {option.label}
          </CyberButton>
        ))}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  objectivesGrid: {
    marginTop: 12,
    gap: 12,
  },
  objectiveButton: {
    marginBottom: 8,
  },
});

export default TriageStepObjectives;
