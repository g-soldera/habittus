import React from 'react';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { CyberpunkInput } from '@/components/cyberpunk-input';

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

      <ThemedText style={{ marginTop: 16, marginBottom: 8 }}>Horas de Estudo por Semana</ThemedText>
      <CyberpunkInput testID="triage-hours-study" accessibilityLabel="Horas de estudo por semana" placeholder="Ex: 10" value={hoursStudyPerWeek} onChangeText={setHoursStudyPerWeek} keyboardType="numeric" />

      <ThemedText style={{ marginTop: 16, marginBottom: 8 }}>Horas de Foco por Dia</ThemedText>
      <CyberpunkInput testID="triage-hours-focus" accessibilityLabel="Horas de foco por dia" placeholder="Ex: 4" value={hoursOfFocusPerDay} onChangeText={setHoursOfFocusPerDay} keyboardType="numeric" />
    </ThemedView>
  );
}

export default TriageStepStudy;
