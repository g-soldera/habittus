import React from 'react';
import { TextInput, View, Pressable, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { CyberpunkColors } from '@/constants/theme';

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
          <Pressable
            key={diet.value}
            testID={`triage-diet-${diet.value}`}
            accessibilityRole="button"
            onPress={() => setDietType(diet.value)}
            style={[
              styles.dietButton,
              dietType === diet.value && styles.dietButtonActive,
            ]}
          >
            <ThemedText style={styles.dietEmoji}>{diet.emoji}</ThemedText>
            <ThemedText
              style={[
                styles.dietButtonText,
                dietType === diet.value && styles.dietButtonTextActive,
              ]}
            >
              {diet.label}
            </ThemedText>
          </Pressable>
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
    width: '30%',
    minWidth: 100,
    padding: 12,
    borderWidth: 2,
    borderColor: CyberpunkColors.darkGray,
    backgroundColor: CyberpunkColors.inputBg,
    borderRadius: 8,
    alignItems: 'center',
  },
  dietButtonActive: {
    borderColor: CyberpunkColors.green,
    backgroundColor: CyberpunkColors.cardBg,
    shadowColor: CyberpunkColors.green,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
  },
  dietEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  dietButtonText: {
    fontSize: 12,
    color: CyberpunkColors.textSecondary,
    textAlign: 'center',
  },
  dietButtonTextActive: {
    color: CyberpunkColors.green,
    fontWeight: 'bold',
  },
});

export default TriageStepNutrition;
