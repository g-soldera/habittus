import React from 'react';
import { View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { CyberpunkButton } from '@/components/cyberpunk-button';
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
      <ThemedText style={{ marginTop: 8, marginBottom: 16 }}>
        Selecione os pilares da vida que deseja melhorar.
      </ThemedText>

      <View style={{ gap: 8 }}>
        {pillarOptions.map(option => (
          <CyberpunkButton
            key={option.value}
            testID={`triage-objective-${option.value}`}
            label={option.label}
            selected={objectives.includes(option.value)}
            onPress={() => toggleObjective(option.value)}
          />
        ))}
      </View>
    </ThemedView>
  );
}

export default TriageStepObjectives;
