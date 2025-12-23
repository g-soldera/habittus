import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Pressable, Alert } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';
import { CyberpunkColors } from '@/constants/theme';
import { useGameState } from '@/hooks/use-game-state';

export function LogNutrition({ onSave }: { onSave: (payload: any) => void }) {
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('250');
  const { logMeal } = useGameState();

  const handleSave = () => {
    const c = parseInt(calories);
    if (Number.isNaN(c) || c <= 0) {
      Alert.alert('Erro', 'Calorias inválidas');
      return;
    }

    if (onSave) {
      onSave({ name, calories: c });
      return;
    }

    logMeal(c, name);
    Alert.alert('Salvo', 'Refeição registrada e XP aplicado');
  };

  return (
    <ThemedView style={styles.container} testID="log-nutrition" accessible accessibilityLabel="Log de Nutrição">
      <ThemedText type="title" testID="log-nutrition-title">Log de Nutrição</ThemedText>

      <ThemedText style={styles.label}>Nome da Refeição</ThemedText>
      <TextInput style={styles.input} value={name} onChangeText={setName} testID="log-nutrition-name" accessibilityLabel="Nome da Refeição" />

      <ThemedText style={styles.label}>Calorias</ThemedText>
      <TextInput style={styles.input} keyboardType="numeric" value={calories} onChangeText={setCalories} testID="log-nutrition-calories" accessibilityLabel="Calorias" />

      <Pressable style={styles.saveButton} onPress={handleSave} testID="log-nutrition-save" accessibilityRole="button" accessibilityLabel="Salvar refeição">
        <ThemedText style={{ color: '#000' }}>Salvar</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 12, borderRadius: 8, borderWidth: 2, borderColor: CyberpunkColors.cyan },
  label: { marginTop: 8, marginBottom: 6, color: CyberpunkColors.cyan },
  input: { borderWidth: 1, borderColor: CyberpunkColors.cyan, borderRadius: 6, padding: 8, color: CyberpunkColors.cyan },
  saveButton: { marginTop: 12, backgroundColor: CyberpunkColors.green, padding: 12, borderRadius: 6, alignItems: 'center' },
});
