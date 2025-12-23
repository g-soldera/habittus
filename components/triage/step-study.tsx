import React from 'react';
import { TextInput } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { CyberpunkColors } from '@/constants/theme';

export function TriageStepStudy({
  hoursStudyPerWeek,
  setHoursStudyPerWeek,
  hoursOfFocusPerDay,
  setHoursOfFocusPerDay,
}: {
  hoursStudyPerWeek: string;
  setHoursStudyPerWeek: (v: string) => void;
  hoursOfFocusPerDay: string;
  setHoursOfFocusPerDay: (v: string) => void;
}) {
  return (
    <ThemedView accessible={true}>
      <ThemedText type="title">Estudo & Produtividade 📚</ThemedText>

      <ThemedText style={{ marginTop: 12 }}>Horas de Estudo por Semana</ThemedText>
      <TextInput testID="triage-hours-study" accessibilityLabel="Horas de estudo por semana" style={{ borderWidth: 1, borderColor: CyberpunkColors.cyan, padding: 8, marginTop: 6 }} value={hoursStudyPerWeek} onChangeText={setHoursStudyPerWeek} keyboardType="numeric" />

      <ThemedText style={{ marginTop: 12 }}>Horas de Foco por Dia</ThemedText>
      <TextInput testID="triage-hours-focus" accessibilityLabel="Horas de foco por dia" style={{ borderWidth: 1, borderColor: CyberpunkColors.cyan, padding: 8, marginTop: 6 }} value={hoursOfFocusPerDay} onChangeText={setHoursOfFocusPerDay} keyboardType="numeric" />
    </ThemedView>
  );
}

export default TriageStepStudy;
