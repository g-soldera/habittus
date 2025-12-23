import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Pressable } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';
import { CyberpunkColors } from '@/constants/theme';
import { useGameState } from '@/hooks/use-game-state';
import { Alert } from 'react-native';

export function LogStudy({ onSave }: { onSave: (payload: any) => void }) {
  const [hours, setHours] = useState('1');
  const [topic, setTopic] = useState('');
  const [type, setType] = useState<'reading' | 'course' | 'practice' | 'project'>('reading');
  const { logStudy } = useGameState();

  const handleSave = () => {
    const h = parseFloat(hours);
    if (onSave) {
      onSave({ hours: h, topic, type });
      return;
    }

    logStudy(h, topic);
    Alert.alert('Salvo', 'Sessão de estudo salva e XP aplicado');
  };

  return (
    <ThemedView style={styles.container} testID="log-study" accessible accessibilityLabel="Log de Estudo">
      <ThemedText type="title" testID="log-study-title">Log de Estudo</ThemedText>

      <ThemedText style={styles.label}>Horas</ThemedText>
      <TextInput style={styles.input} keyboardType="numeric" value={hours} onChangeText={setHours} testID="log-study-hours" accessibilityLabel="Horas" />

      <ThemedText style={styles.label}>Tópico</ThemedText>
      <TextInput style={styles.input} value={topic} onChangeText={setTopic} testID="log-study-topic" accessibilityLabel="Tópico" />

      <ThemedText style={styles.label}>Tipo</ThemedText>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        {['reading', 'course', 'practice', 'project'].map(t => (
          <Pressable key={t} testID={`log-study-type-${t}`} onPress={() => setType(t as any)} style={[styles.typeButton, type === t && styles.typeButtonActive]} accessibilityRole="button" accessibilityLabel={`Tipo ${t}`}>
            <ThemedText>{t}</ThemedText>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.saveButton} onPress={handleSave} testID="log-study-save" accessibilityRole="button" accessibilityLabel="Salvar estudo">
        <ThemedText style={{ color: '#000' }}>Salvar</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 12, borderRadius: 8, borderWidth: 2, borderColor: CyberpunkColors.cyan },
  label: { marginTop: 8, marginBottom: 6, color: CyberpunkColors.cyan },
  input: { borderWidth: 1, borderColor: CyberpunkColors.cyan, borderRadius: 6, padding: 8, color: CyberpunkColors.cyan },
  typeButton: { padding: 8, borderWidth: 1, borderColor: CyberpunkColors.cyan, borderRadius: 6 },
  typeButtonActive: { backgroundColor: CyberpunkColors.cyan },
  saveButton: { marginTop: 12, backgroundColor: CyberpunkColors.green, padding: 12, borderRadius: 6, alignItems: 'center' },
});
