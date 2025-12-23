import React from 'react';
import { View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { CyberpunkInput } from '@/components/cyberpunk-input';
import { CyberpunkButton } from '@/components/cyberpunk-button';

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
  const dietTypes = [
    { value: 'balanced', label: 'Balanceada', icon: '⚖️' },
    { value: 'vegetarian', label: 'Vegetariana', icon: '🥗' },
    { value: 'vegan', label: 'Vegana', icon: '🌱' },
    { value: 'keto', label: 'Keto', icon: '🥑' },
    { value: 'paleo', label: 'Paleo', icon: '🥩' },
    { value: 'mediterranean', label: 'Mediterrânea', icon: '🫒' },
  ];

  return (
    <ThemedView accessible={true}>
      <ThemedText type="title">Nutrição 🍎</ThemedText>

      <ThemedText style={{ marginTop: 16, marginBottom: 8 }}>Tipo de Dieta</ThemedText>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {dietTypes.map(diet => (
          <View key={diet.value} style={{ width: '48%' }}>
            <CyberpunkButton
              testID={`triage-diet-${diet.value}`}
              label={diet.label}
              icon={diet.icon}
              selected={dietType === diet.value}
              onPress={() => setDietType(diet.value)}
            />
          </View>
        ))}
      </View>

      <ThemedText style={{ marginTop: 16, marginBottom: 8 }}>Refeições por Dia</ThemedText>
      <CyberpunkInput 
        testID="triage-meals-per-day" 
        accessibilityLabel="Refeições por dia" 
        placeholder="Ex: 3"
        value={mealsPerDay} 
        onChangeText={setMealsPerDay} 
        keyboardType="numeric" 
      />
    </ThemedView>
  );
}

export default TriageStepNutrition;
