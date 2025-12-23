import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';
import { CyberpunkColors } from '@/constants/theme';
import { useGameState } from '@/hooks/use-game-state';
import { Alert } from 'react-native';

export function LogWater({ onAdd }: { onAdd: (amountMl: number) => void }) {
  const { logWater } = useGameState();
  return (
    <ThemedView style={styles.container} testID="log-water" accessible accessibilityLabel="Hidratação">
      <ThemedText type="title" testID="log-water-title">Hidratação</ThemedText>
      <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
        <Pressable testID="log-water-add-200" style={styles.quickButton} onPress={() => { if (onAdd) { onAdd(200); } else { logWater(200); Alert.alert('Salvo', '200ml registrados'); } }} accessibilityRole="button" accessibilityLabel="Adicionar 200ml">
          <ThemedText>+1 Copo (200ml)</ThemedText>
        </Pressable>
        <Pressable testID="log-water-add-500" style={styles.quickButton} onPress={() => { if (onAdd) { onAdd(500); } else { logWater(500); Alert.alert('Salvo', '500ml registrados'); } }} accessibilityRole="button" accessibilityLabel="Adicionar 500ml">
          <ThemedText>+500ml</ThemedText>
        </Pressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 12, borderRadius: 8, borderWidth: 2, borderColor: CyberpunkColors.cyan },
  quickButton: { padding: 10, backgroundColor: CyberpunkColors.cyan, borderRadius: 6 },
});
