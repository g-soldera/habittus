import React from 'react';
import { View, Pressable, TextInput } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { CyberpunkColors } from '@/constants/theme';

export function TriageStepHealth({
  trainingFrequency,
  setTrainingFrequency,
  trainingType,
  setTrainingType,
}: {
  trainingFrequency: string;
  setTrainingFrequency: (v: string) => void;
  trainingType: any;
  setTrainingType: (v: any) => void;
}) {
  return (
    <ThemedView>
      <ThemedText type="title">Saúde Física 💪</ThemedText>

      <ThemedText style={{ marginTop: 12 }}>Frequência de Treino (dias/semana)</ThemedText>
      <TextInput testID="triage-training-frequency" style={{ borderWidth: 1, borderColor: CyberpunkColors.cyan, padding: 8, marginTop: 6 }} value={trainingFrequency} onChangeText={setTrainingFrequency} keyboardType="numeric" />

      <ThemedText style={{ marginTop: 12 }}>Tipo de Treino</ThemedText>
      <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
        {['strength', 'cardio', 'functional', 'yoga'].map(type => (
          <Pressable key={type} testID={`triage-training-${type}`} onPress={() => setTrainingType(type as any)} style={{ padding: 8, borderWidth: 1, borderColor: CyberpunkColors.cyan, marginRight: 8 }} accessibilityRole="button">
            <ThemedText>{type}</ThemedText>
          </Pressable>
        ))}
      </View>
    </ThemedView>
  );
}

export default TriageStepHealth;
