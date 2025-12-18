import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Pressable, Alert } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';
import { CyberpunkColors } from '@/constants/theme';

export function LogNutrition({ onSave }: { onSave: (payload: any) => void }) {
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('250');

  const handleSave = () => {
    const c = parseInt(calories);
    if (Number.isNaN(c) || c <= 0) {
      Alert.alert('Erro', 'Calorias inválidas');
      return;
    }

    onSave({ name, calories: c });
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Log de Nutrição</ThemedText>

      <ThemedText style={styles.label}>Nome da Refeição</ThemedText>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <ThemedText style={styles.label}>Calorias</ThemedText>
      <TextInput style={styles.input} keyboardType="numeric" value={calories} onChangeText={setCalories} />

      <Pressable style={styles.saveButton} onPress={handleSave}>
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
