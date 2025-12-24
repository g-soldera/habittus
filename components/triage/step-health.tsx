import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { CyberpunkColors } from '@/constants/theme';
import { CyberButton } from '@/components/cyber-button';

type TrainingTypeItem = { type: 'strength' | 'cardio' | 'functional' | 'yoga'; frequency: number };

export function TriageStepHealth({
  trainingFrequency,
  setTrainingFrequency,
  trainingType,
  setTrainingType,
  trainingTypes,
  setTrainingTypes,
}: {
  trainingFrequency: string;
  setTrainingFrequency: (v: string) => void;
  trainingType: any;
  setTrainingType: (v: any) => void;
  trainingTypes: TrainingTypeItem[];
  setTrainingTypes: (v: TrainingTypeItem[]) => void;
}) {
  const trainingLabels = {
    strength: 'Musculação',
    cardio: 'Cardio',
    functional: 'Funcional',
    yoga: 'Yoga',
  };

  const toggleTraining = (type: 'strength' | 'cardio' | 'functional' | 'yoga') => {
    const exists = trainingTypes.find(t => t.type === type);
    if (exists) {
      setTrainingTypes(trainingTypes.filter(t => t.type !== type));
    } else {
      setTrainingTypes([...trainingTypes, { type, frequency: 2 }]);
    }
  };

  const updateFrequency = (type: 'strength' | 'cardio' | 'functional' | 'yoga', frequency: number) => {
    setTrainingTypes(trainingTypes.map(t => 
      t.type === type ? { ...t, frequency } : t
    ));
  };

  return (
    <ThemedView accessible={true}>
      <ThemedText type="title">Saúde Física</ThemedText>

      <ThemedText style={styles.description}>Selecione seus tipos de treino e frequência semanal</ThemedText>

      <View style={styles.trainingList}>
        {(['strength', 'cardio', 'functional', 'yoga'] as const).map(type => {
          const selected = trainingTypes.find(t => t.type === type);
          return (
            <View key={type} style={styles.trainingItem}>
              <CyberButton
                testID={`triage-training-${type}`}
                onPress={() => toggleTraining(type)}
                active={!!selected}
                variant="secondary"
                size="md"
                style={styles.trainingSelectButton}
              >
                {trainingLabels[type]}
              </CyberButton>
              {selected && (
                <View style={styles.frequencyInput}>
                  <TextInput
                    testID={`triage-training-frequency-${type}`}
                    style={styles.input}
                    value={String(selected.frequency)}
                    onChangeText={(v) => updateFrequency(type, parseInt(v) || 0)}
                    keyboardType="numeric"
                    placeholder="0"
                    placeholderTextColor={CyberpunkColors.textDisabled}
                  />
                  <ThemedText style={styles.frequencyLabel}>x/sem</ThemedText>
                </View>
              )}
            </View>
          );
        })}
      </View>

      {trainingTypes.length === 0 && (
        <ThemedText style={styles.hint}>Selecione pelo menos um tipo de treino</ThemedText>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  description: {
    marginTop: 12,
    marginBottom: 16,
    fontSize: 14,
    color: CyberpunkColors.textSecondary,
  },
  trainingList: {
    gap: 12,
  },
  trainingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  trainingSelectButton: {
    flex: 1,
  },
  frequencyInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: 100,
  },
  input: {
    borderWidth: 2,
    borderColor: CyberpunkColors.cyan,
    backgroundColor: CyberpunkColors.inputBg,
    color: CyberpunkColors.textPrimary,
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  frequencyLabel: {
    fontSize: 12,
    color: CyberpunkColors.cyan,
    fontWeight: '600',
  },
  hint: {
    marginTop: 16,
    fontSize: 12,
    color: CyberpunkColors.textDisabled,
    textAlign: 'center',
  },
  label: {
    marginTop: 12,
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '600',
    color: CyberpunkColors.cyan,
  },
  trainingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  trainingButton: {
    flex: 1,
    minWidth: 90,
  },
});

export default TriageStepHealth;
