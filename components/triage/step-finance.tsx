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
      <ThemedText type="title">FINANÇAS & HÁBITOS</ThemedText>

      <ThemedText style={{ marginTop: 12 }}>Renda Mensal (R$)</ThemedText>
      <TextInput testID="triage-monthly-income" accessibilityLabel="Renda mensal" style={{ borderWidth: 2, borderColor: CyberpunkColors.cyan, padding: 12, marginTop: 6, backgroundColor: CyberpunkColors.inputBg, color: CyberpunkColors.textPrimary, borderRadius: 6 }} value={monthlyIncome} onChangeText={setMonthlyIncome} keyboardType="numeric" placeholder="Ex: 4500" placeholderTextColor={CyberpunkColors.textDisabled} />

      <ThemedText style={{ marginTop: 12 }}>Dívida Total (R$)</ThemedText>
      <TextInput testID="triage-total-debt" accessibilityLabel="Dívida total" style={{ borderWidth: 2, borderColor: CyberpunkColors.cyan, padding: 12, marginTop: 6, backgroundColor: CyberpunkColors.inputBg, color: CyberpunkColors.textPrimary, borderRadius: 6 }} value={totalDebt} onChangeText={setTotalDebt} keyboardType="numeric" placeholder="Ex: 20000" placeholderTextColor={CyberpunkColors.textDisabled} />

      <ThemedText style={{ marginTop: 12 }}>Horas de Sono por Noite</ThemedText>
      <TextInput testID="triage-sleep-hours" accessibilityLabel="Horas de sono por noite" style={{ borderWidth: 2, borderColor: CyberpunkColors.cyan, padding: 12, marginTop: 6, backgroundColor: CyberpunkColors.inputBg, color: CyberpunkColors.textPrimary, borderRadius: 6 }} value={averageSleepHours} onChangeText={setAverageSleepHours} keyboardType="numeric" placeholder="Ex: 7" placeholderTextColor={CyberpunkColors.textDisabled} />
    </ThemedView>
  );
}

export default TriageStepFinance;
