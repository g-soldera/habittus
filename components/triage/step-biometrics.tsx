import React from 'react';
import { TextInput } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { CyberpunkColors } from '@/constants/theme';

export function TriageStepBiometrics({
  heightCm,
  setHeightCm,
  weightKg,
  setWeightKg,
  bodyFatPercent,
  setBodyFatPercent,
}: {
  heightCm: string;
  setHeightCm: (v: string) => void;
  weightKg: string;
  setWeightKg: (v: string) => void;
  bodyFatPercent: string;
  setBodyFatPercent: (v: string) => void;
}) {
  return (
    <ThemedView accessible={true}>
      <ThemedText type="title">Dados Biométricos 📏</ThemedText>
      <ThemedText>Insira suas medidas para calcular seu TMB e TDEE.</ThemedText>

      <ThemedText style={{ marginTop: 12 }}>Altura (cm)</ThemedText>
      <TextInput testID="triage-height" accessibilityLabel="Altura em cm" style={{ borderWidth: 1, borderColor: CyberpunkColors.cyan, padding: 8, marginTop: 6 }} value={heightCm} onChangeText={setHeightCm} keyboardType="numeric" />

      <ThemedText style={{ marginTop: 12 }}>Peso (kg)</ThemedText>
      <TextInput testID="triage-weight" accessibilityLabel="Peso em kg" style={{ borderWidth: 1, borderColor: CyberpunkColors.cyan, padding: 8, marginTop: 6 }} value={weightKg} onChangeText={setWeightKg} keyboardType="numeric" />

      <ThemedText style={{ marginTop: 12 }}>% Gordura Corporal</ThemedText>
      <TextInput testID="triage-bodyfat" accessibilityLabel="Percentual de gordura" style={{ borderWidth: 1, borderColor: CyberpunkColors.cyan, padding: 8, marginTop: 6 }} value={bodyFatPercent} onChangeText={setBodyFatPercent} keyboardType="numeric" />
    </ThemedView>
  );
}

export default TriageStepBiometrics;
