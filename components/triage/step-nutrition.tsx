import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { CyberpunkColors } from '@/constants/theme';
import { CyberButton } from '@/components/cyber-button';

const DIET_OPTIONS = [
  { value: 'balanced', label: '⚖️ Balanceada', emoji: '⚖️' },
  { value: 'vegetarian', label: '🥗 Vegetariana', emoji: '🥗' },
  { value: 'vegan', label: '🌱 Vegana', emoji: '🌱' },
  { value: 'keto', label: '🥑 Keto', emoji: '🥑' },
  { value: 'paleo', label: '🍖 Paleo', emoji: '🍖' },
  { value: 'carnivore', label: '🥩 Carnívora', emoji: '🥩' },
];

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
      <ThemedText type="title" style={styles.title}>Nutrição 🍎</ThemedText>

      <ThemedText style={styles.label}>Tipo de Dieta</ThemedText>
      <View style={styles.dietGrid}>
        {DIET_OPTIONS.map((diet) => (
          <CyberButton
            key={diet.value}
            testID={`triage-diet-${diet.value}`}
            onPress={() => setDietType(diet.value)}
            active={dietType === diet.value}
            variant="secondary"
            size="sm"
            icon={diet.emoji}
            style={styles.dietButton}
            accessibilityLabel={diet.label}
          >
            {diet.label}
          </CyberButton>
        ))}
      </View>

      <ThemedText style={styles.label}>Refeições por Dia</ThemedText>
      <TextInput
        testID="triage-meals-per-day"
        accessibilityLabel="Refeições por dia"
        style={styles.input}
        value={mealsPerDay}
        onChangeText={setMealsPerDay}
        keyboardType="numeric"
        placeholder="Ex: 3"
        placeholderTextColor={CyberpunkColors.textDisabled}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  title: {
    color: CyberpunkColors.cyan,
  },
  label: {
    marginTop: 16,
    marginBottom: 12,
    fontSize: 14,
    fontWeight: '600',
    color: CyberpunkColors.cyan,
  },
  input: {
    borderWidth: 2,
    borderColor: CyberpunkColors.cyan,
    backgroundColor: CyberpunkColors.inputBg,
    color: CyberpunkColors.textPrimary,
    padding: 12,
    borderRadius: 6,
    fontSize: 16,
  },
  dietGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  dietButton: {
    width: '31%',
    minWidth: 95,
    marginBottom: 8,
  },
});

export default TriageStepNutrition;
