import React from 'react';
import { TextInput } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { CyberpunkColors } from '@/constants/theme';

export function TriageStepFinance({
  monthlyIncome,
  setMonthlyIncome,
  totalDebt,
  setTotalDebt,
  averageSleepHours,
  setAverageSleepHours,
}: {
  monthlyIncome: string;
  setMonthlyIncome: (v: string) => void;
  totalDebt: string;
  setTotalDebt: (v: string) => void;
  averageSleepHours: string;
  setAverageSleepHours: (v: string) => void;
}) {
  return (
    <ThemedView accessible={true}>
      <ThemedText type="title">Finanças & Hábitos 💰</ThemedText>

      <ThemedText style={{ marginTop: 12 }}>Renda Mensal (R$)</ThemedText>
      <TextInput testID="triage-monthly-income" accessibilityLabel="Renda mensal" style={{ borderWidth: 1, borderColor: CyberpunkColors.cyan, padding: 8, marginTop: 6 }} value={monthlyIncome} onChangeText={setMonthlyIncome} keyboardType="numeric" />

      <ThemedText style={{ marginTop: 12 }}>Dívida Total (R$)</ThemedText>
      <TextInput testID="triage-total-debt" accessibilityLabel="Dívida total" style={{ borderWidth: 1, borderColor: CyberpunkColors.cyan, padding: 8, marginTop: 6 }} value={totalDebt} onChangeText={setTotalDebt} keyboardType="numeric" />

      <ThemedText style={{ marginTop: 12 }}>Horas de Sono por Noite</ThemedText>
      <TextInput testID="triage-sleep-hours" accessibilityLabel="Horas de sono por noite" style={{ borderWidth: 1, borderColor: CyberpunkColors.cyan, padding: 8, marginTop: 6 }} value={averageSleepHours} onChangeText={setAverageSleepHours} keyboardType="numeric" />
    </ThemedView>
  );
}

export default TriageStepFinance;
