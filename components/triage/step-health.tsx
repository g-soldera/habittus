import React from 'react';
import { View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { CyberpunkInput } from '@/components/cyberpunk-input';
import { CyberpunkButton } from '@/components/cyberpunk-button';

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
  const trainingTypes = [
    { value: 'strength', label: 'Força', icon: '🏋️' },
    { value: 'cardio', label: 'Cardio', icon: '🏃' },
    { value: 'functional', label: 'Funcional', icon: '🤸' },
    { value: 'yoga', label: 'Yoga', icon: '🧘' },
  ];

  return (
    <ThemedView accessible={true}>
      <ThemedText type="title">Saúde Física 💪</ThemedText>

      <ThemedText style={{ marginTop: 16, marginBottom: 8 }}>Frequência de Treino (dias/semana)</ThemedText>
      <CyberpunkInput 
        testID="triage-training-frequency" 
        placeholder="Ex: 3"
        value={trainingFrequency} 
        onChangeText={setTrainingFrequency} 
        keyboardType="numeric" 
      />

      <ThemedText style={{ marginTop: 16, marginBottom: 8 }}>Tipo de Treino</ThemedText>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {trainingTypes.map(type => (
          <View key={type.value} style={{ flex: 1, minWidth: '45%' }}>
            <CyberpunkButton
              testID={`triage-training-${type.value}`}
              label={type.label}
              icon={type.icon}
              selected={trainingType === type.value}
              onPress={() => setTrainingType(type.value as any)}
            />
          </View>
        ))}
      </View>
    </ThemedView>
  );
}

export default TriageStepHealth;
