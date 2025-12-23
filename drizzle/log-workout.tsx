import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Pressable, Alert } from 'react-native';
import { ThemedText } from '../components/themed-text';
import { ThemedView } from '../components/themed-view';
import { CyberpunkColors } from '@/constants/theme';
import { useGameState } from '@/hooks/use-game-state';

export function LogWorkout({ onSave }: { onSave: (payload: any) => void }) {
  const [type, setType] = useState<'strength' | 'cardio' | 'functional' | 'yoga'>('strength');
  const [duration, setDuration] = useState('30');
  const [intensity, setIntensity] = useState<'low' | 'medium' | 'high'>('medium');

  const { logWorkout } = useGameState();

  const handleSave = () => {
    const minutes = parseInt(duration);
    if (Number.isNaN(minutes) || minutes <= 0) {
      Alert.alert('Erro', 'Duração inválida');
      return;
    }

    const mappedIntensity = intensity === 'medium' ? 'moderate' : (intensity as any);

    if (onSave) {
      onSave({ type, duration: minutes, intensity: mappedIntensity });
      return;
    }

    // default: persist to game state
    logWorkout(minutes, mappedIntensity as any);
    Alert.alert('Salvo', 'Treino salvo e XP aplicado');
  };

  return (
    <ThemedView style={styles.container} testID="log-workout" accessible accessibilityLabel="Log de Treino">
      <View style={styles.header}>
        <ThemedText style={styles.emoji}>💪</ThemedText>
        <ThemedText type="title" testID="log-workout-title">TREINO</ThemedText>
      </View>

      <ThemedText style={styles.label}>Tipo</ThemedText>
      <View style={styles.row}>
        {[
          { value: 'strength' as const, label: '⚔️ Força' },
          { value: 'cardio' as const, label: '🏃 Cardio' },
          { value: 'functional' as const, label: '🤸 Funcional' },
          { value: 'yoga' as const, label: '🧘 Yoga' },
        ].map(({ value, label }) => (
          <Pressable 
            key={value} 
            testID={`log-workout-type-${value}`} 
            onPress={() => setType(value)} 
            style={[styles.typeButton, type === value && styles.typeButtonActive]} 
            accessibilityRole="button" 
            accessibilityLabel={label}
          >
            <ThemedText style={[styles.typeButtonText, type === value && styles.typeButtonTextActive]}>
              {label}
            </ThemedText>
          </Pressable>
        ))}
      </View>

      <ThemedText style={styles.label}>Duração (min)</ThemedText>
      <TextInput 
        style={styles.input} 
        keyboardType="numeric" 
        value={duration} 
        onChangeText={setDuration} 
        testID="log-workout-duration" 
        accessibilityLabel="Duração (min)"
        placeholderTextColor={CyberpunkColors.textDisabled}
      />

      <ThemedText style={styles.label}>Intensidade</ThemedText>
      <View style={styles.row}>
        {[
          { value: 'low' as const, label: '🟢 Baixa' },
          { value: 'medium' as const, label: '🟡 Média' },
          { value: 'high' as const, label: '🔴 Alta' },
        ].map(({ value, label }) => (
          <Pressable 
            key={value} 
            testID={`log-workout-intensity-${value}`} 
            onPress={() => setIntensity(value)} 
            style={[styles.typeButton, intensity === value && styles.typeButtonActive]} 
            accessibilityRole="button" 
            accessibilityLabel={label}
          >
            <ThemedText style={[styles.typeButtonText, intensity === value && styles.typeButtonTextActive]}>
              {label}
            </ThemedText>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.saveButton} onPress={handleSave} testID="log-workout-save" accessibilityRole="button" accessibilityLabel="Salvar treino">
        <ThemedText style={styles.saveButtonText}>✓ SALVAR XP</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { 
    padding: 16, 
    borderRadius: 8, 
    borderWidth: 2, 
    borderColor: CyberpunkColors.cyan,
    backgroundColor: CyberpunkColors.cardBg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  emoji: {
    fontSize: 32,
  },
  label: { 
    marginTop: 12, 
    marginBottom: 8, 
    color: CyberpunkColors.cyan,
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Courier New',
  },
  input: { 
    borderWidth: 1, 
    borderColor: CyberpunkColors.cyan, 
    borderRadius: 6, 
    padding: 10,
    color: CyberpunkColors.cyan,
    fontFamily: 'monospace',
    marginBottom: 8,
  },
  row: { 
    flexDirection: 'row', 
    gap: 6, 
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  typeButton: { 
    flex: 1,
    minWidth: '48%',
    padding: 10, 
    borderWidth: 1, 
    borderColor: CyberpunkColors.cyan, 
    borderRadius: 6,
    backgroundColor: CyberpunkColors.inputBg,
    alignItems: 'center',
  },
  typeButtonActive: { 
    backgroundColor: CyberpunkColors.cyan,
    borderColor: CyberpunkColors.cyan,
  },
  typeButtonText: {
    fontSize: 11,
    color: CyberpunkColors.cyan,
    fontWeight: '600',
  },
  typeButtonTextActive: {
    color: CyberpunkColors.black,
  },
  saveButton: { 
    marginTop: 16, 
    backgroundColor: CyberpunkColors.green, 
    padding: 14, 
    borderRadius: 6, 
    alignItems: 'center',
    borderWidth: 2,
    borderColor: CyberpunkColors.green,
  },
  saveButtonText: {
    color: CyberpunkColors.black,
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: 'Courier New',
  },
});
