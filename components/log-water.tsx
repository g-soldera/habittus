import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';
import { CyberpunkColors } from '@/constants/theme';

export function LogWater({ onAdd }: { onAdd: (amountMl: number) => void }) {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Hidratação</ThemedText>
      <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
        <Pressable style={styles.quickButton} onPress={() => onAdd(200)}>
          <ThemedText>+1 Copo (200ml)</ThemedText>
        </Pressable>
        <Pressable style={styles.quickButton} onPress={() => onAdd(500)}>
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
