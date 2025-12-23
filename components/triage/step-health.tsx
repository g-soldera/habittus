import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { CyberpunkColors } from '@/constants/theme';
import { CyberButton } from '@/components/cyber-button';

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
    <ThemedView accessible={true}>
      <ThemedText type="title">Saúde Física 💪</ThemedText>

      <ThemedText style={{ marginTop: 12 }}>Frequência de Treino (dias/semana)</ThemedText>
      <TextInput testID="triage-training-frequency" style={{ borderWidth: 2, borderColor: CyberpunkColors.cyan, padding: 12, marginTop: 6, backgroundColor: CyberpunkColors.inputBg, color: CyberpunkColors.textPrimary, borderRadius: 6 }} value={trainingFrequency} onChangeText={setTrainingFrequency} keyboardType="numeric" placeholder="Ex: 3" placeholderTextColor={CyberpunkColors.textDisabled} />

      <ThemedText style={styles.label}>Tipo de Treino</ThemedText>
      <View style={styles.trainingGrid}>
        {['strength', 'cardio', 'functional', 'yoga'].map(type => (
          <CyberButton
            key={type}
            testID={`triage-training-${type}`}
            onPress={() => setTrainingType(type as any)}
            active={trainingType === type}
            variant="secondary"
            size="sm"
            fullWidth={false}
            style={styles.trainingButton}
            accessibilityLabel={type}
          >
            {type}
          </CyberButton>
        ))}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
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
