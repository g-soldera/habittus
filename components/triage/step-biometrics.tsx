import React from 'react';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { CyberpunkInput } from '@/components/cyberpunk-input';

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

      <ThemedText style={{ marginTop: 16, marginBottom: 8 }}>Altura (cm)</ThemedText>
      <CyberpunkInput testID="triage-height" accessibilityLabel="Altura em centímetros" placeholder="Ex: 175" value={heightCm} onChangeText={setHeightCm} keyboardType="numeric" />

      <ThemedText style={{ marginTop: 16, marginBottom: 8 }}>Peso (kg)</ThemedText>
      <CyberpunkInput testID="triage-weight" accessibilityLabel="Peso em quilogramas" placeholder="Ex: 75" value={weightKg} onChangeText={setWeightKg} keyboardType="numeric" />

      <ThemedText style={{ marginTop: 16, marginBottom: 8 }}>% Gordura Corporal</ThemedText>
      <CyberpunkInput testID="triage-bodyfat" accessibilityLabel="Percentual de gordura" placeholder="Ex: 20" value={bodyFatPercent} onChangeText={setBodyFatPercent} keyboardType="numeric" />
    </ThemedView>
  );
}

export default TriageStepBiometrics;
