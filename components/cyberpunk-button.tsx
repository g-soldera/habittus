import React from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import { ThemedText } from './themed-text';
import { CyberpunkColors } from '@/constants/theme';

interface CyberpunkButtonProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  testID?: string;
  style?: ViewStyle;
  icon?: string;
}

export function CyberpunkButton({ label, selected, onPress, testID, style, icon }: CyberpunkButtonProps) {
  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      style={[
        styles.button,
        selected && styles.buttonSelected,
        style,
      ]}
      accessible
      accessibilityLabel={label}
      accessibilityState={{ selected }}
    >
      {icon && <ThemedText style={styles.icon}>{icon}</ThemedText>}
      <ThemedText style={[
        styles.buttonText,
        selected && styles.buttonTextSelected,
      ]}>
        {label}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    borderColor: CyberpunkColors.cyan,
    backgroundColor: CyberpunkColors.cardBg,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonSelected: {
    borderColor: CyberpunkColors.magenta,
    backgroundColor: CyberpunkColors.magenta + '20',
    shadowColor: CyberpunkColors.magenta,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonText: {
    color: CyberpunkColors.textPrimary,
    fontFamily: 'Courier New',
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonTextSelected: {
    color: CyberpunkColors.magenta,
  },
  icon: {
    fontSize: 20,
  },
});
