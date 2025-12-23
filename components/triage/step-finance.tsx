import React from 'react';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { CyberpunkInput } from '@/components/cyberpunk-input';

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

      <ThemedText style={{ marginTop: 16, marginBottom: 8 }}>Renda Mensal (R$)</ThemedText>
      <CyberpunkInput testID="triage-monthly-income" accessibilityLabel="Renda mensal" placeholder="Ex: 5000" value={monthlyIncome} onChangeText={setMonthlyIncome} keyboardType="numeric" />

      <ThemedText style={{ marginTop: 16, marginBottom: 8 }}>Dívida Total (R$)</ThemedText>
      <CyberpunkInput testID="triage-total-debt" accessibilityLabel="Dívida total" placeholder="Ex: 10000" value={totalDebt} onChangeText={setTotalDebt} keyboardType="numeric" />

      <ThemedText style={{ marginTop: 16, marginBottom: 8 }}>Horas de Sono por Noite</ThemedText>
      <CyberpunkInput testID="triage-sleep-hours" accessibilityLabel="Horas de sono por noite" placeholder="Ex: 7" value={averageSleepHours} onChangeText={setAverageSleepHours} keyboardType="numeric" />
    </ThemedView>
  );
}

export default TriageStepFinance;
