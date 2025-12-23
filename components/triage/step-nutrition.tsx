import React from 'react';
import { TextInput } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { CyberpunkColors } from '@/constants/theme';

export function TriageStepNutrition({
  dietType,
  setDietType,
  mealsPerDay,
  setMealsPerDay,
}: {
  dietType: string;
  setDietType: (v: string) => void;
  mealsPerDay: string;
  setMealsPerDay: (v: string) => void;
}) {
  return (
    <ThemedView accessible={true}>
      <ThemedText type="title">Nutrição 🍎</ThemedText>

      <ThemedText style={{ marginTop: 12 }}>Tipo de Dieta</ThemedText>
      <TextInput testID="triage-diet" accessibilityLabel="Tipo de Dieta" style={{ borderWidth: 1, borderColor: CyberpunkColors.cyan, padding: 8, marginTop: 6 }} value={dietType} onChangeText={setDietType} />

      <ThemedText style={{ marginTop: 12 }}>Refeições por Dia</ThemedText>
      <TextInput testID="triage-meals-per-day" accessibilityLabel="Refeições por dia" style={{ borderWidth: 1, borderColor: CyberpunkColors.cyan, padding: 8, marginTop: 6 }} value={mealsPerDay} onChangeText={setMealsPerDay} keyboardType="numeric" />
    </ThemedView>
  );
}

export default TriageStepNutrition;
