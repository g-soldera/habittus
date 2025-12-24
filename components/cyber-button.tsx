import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { CyberpunkColors } from '@/constants/theme';
import { useHaptics } from '@/hooks/use-haptics';

export interface CyberButtonProps {
  onPress?: () => void;
  disabled?: boolean;
  active?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: string | React.ReactNode;
  testID?: string;
  accessibilityLabel?: string;
  icon?: string;
  style?: any;
  fullWidth?: boolean;
}

/**
 * CyberButton: Componente de botão cyberpunk reutilizável
 * Suporta estados: ativo, desabilidado, variantes de estilo
 * Usado em toda a triagem e formulários para consistência
 */
export function CyberButton({
  onPress,
  disabled = false,
  active = false,
  variant = 'secondary',
  size = 'md',
  children,
  testID,
  accessibilityLabel,
  icon,
  style,
  fullWidth = false,
}: CyberButtonProps) {
  const isDisabled = disabled;
  const isActive = active && !isDisabled;
  const haptics = useHaptics();

  const handlePress = () => {
    haptics.lightTap();
    onPress?.();
  };

  // Determina cores baseado no estado e variante
  const getColors = () => {
    if (isDisabled) {
      return {
        bgColor: CyberpunkColors.inputBg,
        borderColor: CyberpunkColors.darkGray,
        textColor: CyberpunkColors.textDisabled,
      };
    }

    if (isActive) {
      switch (variant) {
        case 'primary':
          return {
            bgColor: CyberpunkColors.cyan,
            borderColor: CyberpunkColors.cyan,
            textColor: CyberpunkColors.black,
          };
        case 'secondary':
          return {
            bgColor: CyberpunkColors.cardBg,
            borderColor: CyberpunkColors.green,
            textColor: CyberpunkColors.green,
          };
        case 'ghost':
          return {
            bgColor: 'transparent',
            borderColor: CyberpunkColors.cyan,
            textColor: CyberpunkColors.cyan,
          };
      }
    }

    // Estados inativo/default
    switch (variant) {
      case 'primary':
        return {
          bgColor: CyberpunkColors.cyan,
          borderColor: CyberpunkColors.cyan,
          textColor: CyberpunkColors.black,
        };
      case 'secondary':
        return {
          bgColor: CyberpunkColors.inputBg,
          borderColor: CyberpunkColors.cyan,
          textColor: CyberpunkColors.textSecondary,
        };
      case 'ghost':
        return {
          bgColor: 'transparent',
          borderColor: CyberpunkColors.darkGray,
          textColor: CyberpunkColors.textSecondary,
        };
    }
  };

  const sizes = {
    sm: { paddingVertical: 8, paddingHorizontal: 12, fontSize: 12 },
    md: { paddingVertical: 12, paddingHorizontal: 16, fontSize: 14 },
    lg: { paddingVertical: 16, paddingHorizontal: 20, fontSize: 16 },
  };

  const colors = getColors();
  const sizeStyle = sizes[size];

  return (
    <Pressable
      onPress={handlePress}
      disabled={isDisabled}
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || (typeof children === 'string' ? children : '')}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: colors.bgColor,
          borderColor: colors.borderColor,
          borderWidth: 2,
          paddingVertical: sizeStyle.paddingVertical,
          paddingHorizontal: sizeStyle.paddingHorizontal,
          opacity: pressed && !isDisabled ? 0.8 : 1,
          width: fullWidth ? '100%' : 'auto',
          // Glow effect quando ativo
          shadowColor: isActive ? colors.borderColor : 'transparent',
          shadowOpacity: isActive ? 0.6 : 0,
          shadowRadius: isActive ? 8 : 0,
          elevation: isActive ? 5 : 0,
        },
        style,
      ]}
    >
      <View style={styles.content}>
        {icon && <ThemedText style={styles.icon}>{icon}</ThemedText>}
        {typeof children === 'string' ? (
          <ThemedText style={[styles.text, { color: colors.textColor, fontSize: sizeStyle.fontSize }]}>
            {children}
          </ThemedText>
        ) : (
          children
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  text: {
    fontWeight: '600',
    fontFamily: 'Courier New',
  },
  icon: {
    fontSize: 16,
  },
});

export default CyberButton;
