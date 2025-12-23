import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import { CyberpunkColors } from '@/constants/theme';

interface CyberpunkInputProps extends TextInputProps {
  glowing?: boolean;
}

export function CyberpunkInput({ glowing, style, ...props }: CyberpunkInputProps) {
  return (
    <TextInput
      {...props}
      style={[
        styles.input,
        glowing && styles.glowing,
        style,
      ]}
      placeholderTextColor={CyberpunkColors.textDisabled}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderColor: CyberpunkColors.cyan,
    backgroundColor: CyberpunkColors.inputBg,
    color: CyberpunkColors.textPrimary,
    padding: 12,
    borderRadius: 4,
    fontFamily: 'Courier New',
    fontSize: 14,
  },
  glowing: {
    borderColor: CyberpunkColors.magenta,
    shadowColor: CyberpunkColors.magenta,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 8,
  },
});
