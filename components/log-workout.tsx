import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Pressable, Alert } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';
import { CyberpunkColors } from '@/constants/theme';

export function LogWorkout({ onSave }: { onSave: (payload: any) => void }) {
  const [type, setType] = useState<'strength' | 'cardio' | 'functional' | 'yoga'>('strength');
  const [duration, setDuration] = useState('30');
  const [intensity, setIntensity] = useState<'low' | 'medium' | 'high'>('medium');

  const handleSave = () => {
    const minutes = parseInt(duration);
    if (Number.isNaN(minutes) || minutes <= 0) {
      Alert.alert('Erro', 'Duração inválida');
      return;
    }

    onSave({ type, duration: minutes, intensity });
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Log de Treino</ThemedText>

      <ThemedText style={styles.label}>Tipo</ThemedText>
      <View style={styles.row}>
        {['strength', 'cardio', 'functional', 'yoga'].map(t => (
          <Pressable key={t} onPress={() => setType(t as any)} style={[styles.typeButton, type === t && styles.typeButtonActive]}>
            <ThemedText>{t}</ThemedText>
          </Pressable>
        ))}
      </View>

      <ThemedText style={styles.label}>Duração (min)</ThemedText>
      <TextInput style={styles.input} keyboardType="numeric" value={duration} onChangeText={setDuration} />

      <ThemedText style={styles.label}>Intensidade</ThemedText>
      <View style={styles.row}>
        {['low', 'medium', 'high'].map(i => (
          <Pressable key={i} onPress={() => setIntensity(i as any)} style={[styles.typeButton, intensity === i && styles.typeButtonActive]}>
            <ThemedText>{i}</ThemedText>
          </Pressable>
        ))}
      </View>

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
  row: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  typeButton: { padding: 8, borderWidth: 1, borderColor: CyberpunkColors.cyan, borderRadius: 6 },
  typeButtonActive: { backgroundColor: CyberpunkColors.cyan },
  saveButton: { marginTop: 12, backgroundColor: CyberpunkColors.green, padding: 12, borderRadius: 6, alignItems: 'center' },
});
