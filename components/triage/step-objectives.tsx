import React from 'react';
import { View, Pressable } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { CyberpunkColors } from '@/constants/theme';
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

      <View style={{ marginTop: 12 }}>
        {pillarOptions.map(option => {
          const isActive = objectives.includes(option.value);
          return (
            <Pressable
              key={option.value}
              testID={`triage-objective-${option.value}`}
              style={{
                padding: 12,
                borderWidth: 2,
                borderColor: isActive ? CyberpunkColors.green : CyberpunkColors.cyan,
                marginBottom: 8,
                backgroundColor: isActive ? CyberpunkColors.cardBg : CyberpunkColors.inputBg,
                borderRadius: 8,
              }}
              onPress={() => toggleObjective(option.value)}
              accessibilityRole="button"
            >
              <ThemedText style={{ color: isActive ? CyberpunkColors.green : CyberpunkColors.textSecondary, fontWeight: isActive ? '700' as any : '600' as any }}>
                {option.label}
              </ThemedText>
            </Pressable>
          );
        })}
      </View>
    </ThemedView>
  );
}

export default TriageStepObjectives;
