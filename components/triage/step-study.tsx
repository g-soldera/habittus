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
      <ThemedText type="title">ESTUDO & PRODUTIVIDADE</ThemedText>

      <ThemedText style={{ marginTop: 12 }}>Horas de Estudo por Semana</ThemedText>
      <TextInput testID="triage-hours-study" accessibilityLabel="Horas de estudo por semana" style={{ borderWidth: 2, borderColor: CyberpunkColors.cyan, padding: 12, marginTop: 6, backgroundColor: CyberpunkColors.inputBg, color: CyberpunkColors.textPrimary, borderRadius: 6 }} value={hoursStudyPerWeek} onChangeText={setHoursStudyPerWeek} keyboardType="numeric" placeholder="Ex: 10" placeholderTextColor={CyberpunkColors.textDisabled} />

      <ThemedText style={{ marginTop: 12 }}>Horas de Foco por Dia</ThemedText>
      <TextInput testID="triage-hours-focus" accessibilityLabel="Horas de foco por dia" style={{ borderWidth: 2, borderColor: CyberpunkColors.cyan, padding: 12, marginTop: 6, backgroundColor: CyberpunkColors.inputBg, color: CyberpunkColors.textPrimary, borderRadius: 6 }} value={hoursOfFocusPerDay} onChangeText={setHoursOfFocusPerDay} keyboardType="numeric" placeholder="Ex: 4" placeholderTextColor={CyberpunkColors.textDisabled} />
    </ThemedView>
  );
}

export default TriageStepStudy;
