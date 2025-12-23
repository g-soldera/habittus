import React, { useState } from 'react';
import { Pressable, StyleSheet, View, Modal } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { CyberpunkColors } from '@/constants/theme';

export interface TooltipProps {
  title: string;
  description: string;
  children: React.ReactNode;
  triggerIcon?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

/**
 * Tooltip component para exibir informações contextuais
 * Usado em BioMonitor e outros stats
 */
export function Tooltip({
  title,
  description,
  children,
  triggerIcon = '?',
  position = 'top',
}: TooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Pressable
        onPress={() => setVisible(true)}
        style={styles.trigger}
        accessibilityRole="button"
        accessibilityLabel={`Info: ${title}`}
      >
        {children}
        <View style={styles.badge}>
          <ThemedText style={styles.badgeText}>{triggerIcon}</ThemedText>
        </View>
      </Pressable>

      <Modal
        visible={visible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable
          style={styles.backdrop}
          onPress={() => setVisible(false)}
          accessibilityRole="button"
        >
          <View style={[styles.content, styles[`position_${position}`]]}>
            <ThemedText style={styles.title}>{title}</ThemedText>
            <ThemedText style={styles.description}>{description}</ThemedText>
            <Pressable
              onPress={() => setVisible(false)}
              style={styles.closeButton}
              accessibilityRole="button"
              accessibilityLabel="Fechar"
            >
              <ThemedText style={styles.closeButtonText}>✕</ThemedText>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    position: 'relative',
    width: '100%',
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: CyberpunkColors.magenta,
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: CyberpunkColors.cyan,
  },
  badgeText: {
    color: CyberpunkColors.black,
    fontSize: 12,
    fontWeight: 'bold',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: CyberpunkColors.cardBg,
    borderWidth: 2,
    borderColor: CyberpunkColors.cyan,
    borderRadius: 12,
    padding: 16,
    maxWidth: 300,
    shadowColor: CyberpunkColors.cyan,
    shadowOpacity: 0.8,
    shadowRadius: 16,
    elevation: 8,
  },
  position_top: {
    marginBottom: 200,
  },
  position_bottom: {
    marginTop: 200,
  },
  position_left: {
    marginRight: 100,
  },
  position_right: {
    marginLeft: 100,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: CyberpunkColors.cyan,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: CyberpunkColors.textSecondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 4,
  },
  closeButtonText: {
    color: CyberpunkColors.magenta,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Tooltip;
